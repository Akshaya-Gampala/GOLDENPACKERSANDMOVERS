const GalleryItem = require('../models/GalleryItem');
const path = require('path');
const fs = require('fs');

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
const getGallery = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    const items = await GalleryItem.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error('Get Gallery Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch gallery items' });
  }
};

// @desc    Get single gallery item by ID
// @route   GET /api/gallery/:id
// @access  Public
const getGalleryById = async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching gallery item' });
  }
};

// @desc    Create new gallery item (with file upload or external image URL)
// @route   POST /api/gallery
// @access  Private (Admin)
const createGalleryItem = async (req, res) => {
  try {
    const { title, description, category, imageUrl, date, isFeatured } = req.body;

    let finalImageUrl = imageUrl || '';

    // If file was uploaded via Multer
    if (req.file) {
      finalImageUrl = `/uploads/${req.file.filename}`;
    }

    if (!title || !category || !finalImageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, category, and an image (file upload or image URL)',
      });
    }

    const newItem = await GalleryItem.create({
      title,
      description: description || '',
      category,
      imageUrl: finalImageUrl,
      date: date || new Date().toISOString().split('T')[0],
      isFeatured: isFeatured === 'true' || isFeatured === true,
    });

    res.status(201).json({
      success: true,
      message: 'Work experience photo uploaded successfully!',
      data: newItem,
    });
  } catch (error) {
    console.error('Create Gallery Item Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload gallery item',
      error: error.message,
    });
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private (Admin)
const updateGalleryItem = async (req, res) => {
  try {
    const { title, description, category, imageUrl, date, isFeatured } = req.body;
    const item = await GalleryItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    if (title) item.title = title;
    if (description !== undefined) item.description = description;
    if (category) item.category = category;
    if (date) item.date = date;
    if (isFeatured !== undefined) item.isFeatured = isFeatured;

    if (req.file) {
      // Remove old file if it was locally stored
      if (item.imageUrl && item.imageUrl.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '..', item.imageUrl);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      item.imageUrl = `/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      item.imageUrl = imageUrl;
    }

    const updatedItem = await item.save();

    res.status(200).json({
      success: true,
      message: 'Gallery item updated successfully',
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update gallery item' });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private (Admin)
const deleteGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    // Delete local file if present
    if (item.imageUrl && item.imageUrl.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', item.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await GalleryItem.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete gallery item' });
  }
};

module.exports = {
  getGallery,
  getGalleryById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
};

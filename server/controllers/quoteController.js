const QuoteRequest = require('../models/QuoteRequest');

// @desc    Create a new quote request
// @route   POST /api/quotes
// @access  Public
const createQuote = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      movingFrom,
      movingTo,
      movingDate,
      propertyType,
      rooms,
      service,
      items,
      message,
    } = req.body;

    if (!name || !phone || !movingFrom || !movingTo || !movingDate || !service) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Phone, Pickup, Destination, Moving Date, Service)',
      });
    }

    const newQuote = await QuoteRequest.create({
      name,
      phone,
      email: email || '',
      movingFrom,
      movingTo,
      movingDate,
      propertyType: propertyType || 'Apartment',
      rooms: rooms || '2 BHK',
      service,
      items: items || '',
      message: message || '',
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully! Our team will contact you shortly.',
      data: newQuote,
    });
  } catch (error) {
    console.error('Create Quote Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quote request',
      error: error.message,
    });
  }
};

// @desc    Get all quote requests
// @route   GET /api/quotes
// @access  Private (Admin)
const getQuotes = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { movingFrom: { $regex: search, $options: 'i' } },
        { movingTo: { $regex: search, $options: 'i' } },
      ];
    }

    const quotes = await QuoteRequest.find(query).sort({ createdAt: -1 });

    const total = await QuoteRequest.countDocuments();
    const newCount = await QuoteRequest.countDocuments({ status: 'New' });
    const completedCount = await QuoteRequest.countDocuments({ status: 'Completed' });

    res.status(200).json({
      success: true,
      count: quotes.length,
      stats: {
        total,
        new: newCount,
        completed: completedCount,
      },
      data: quotes,
    });
  } catch (error) {
    console.error('Get Quotes Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quote requests',
      error: error.message,
    });
  }
};

// @desc    Get single quote request by ID
// @route   GET /api/quotes/:id
// @access  Private (Admin)
const getQuoteById = async (req, res) => {
  try {
    const quote = await QuoteRequest.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote request not found' });
    }

    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching quote details' });
  }
};

// @desc    Update quote request status or notes
// @route   PUT /api/quotes/:id
// @access  Private (Admin)
const updateQuote = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const quote = await QuoteRequest.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote request not found' });
    }

    if (status) quote.status = status;
    if (notes !== undefined) quote.notes = notes;

    const updatedQuote = await quote.save();

    res.status(200).json({
      success: true,
      message: 'Quote request updated successfully',
      data: updatedQuote,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update quote request' });
  }
};

// @desc    Delete quote request
// @route   DELETE /api/quotes/:id
// @access  Private (Admin)
const deleteQuote = async (req, res) => {
  try {
    const quote = await QuoteRequest.findByIdAndDelete(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote request not found' });
    }

    res.status(200).json({ success: true, message: 'Quote request deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete quote request' });
  }
};

module.exports = {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
};

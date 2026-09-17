const express = require('express');
const router = express.Router();
const {
  getGallery,
  getGalleryById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require('../controllers/galleryController');
const { protectAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getGallery);
router.get('/:id', getGalleryById);
router.post('/', protectAdmin, upload.single('image'), createGalleryItem);
router.put('/:id', protectAdmin, upload.single('image'), updateGalleryItem);
router.delete('/:id', protectAdmin, deleteGalleryItem);

module.exports = router;

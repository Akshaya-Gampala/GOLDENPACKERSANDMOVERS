const express = require('express');
const router = express.Router();
const {
  submitReview,
  getApprovedReviews,
  getAllReviewsAdmin,
  updateReviewStatusAdmin,
  deleteReviewAdmin,
} = require('../controllers/reviewController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Public Routes
router.post('/', submitReview);
router.get('/', getApprovedReviews);

// Admin Routes (Protected)
router.get('/admin', protectAdmin, getAllReviewsAdmin);
router.put('/:id/status', protectAdmin, updateReviewStatusAdmin);
router.delete('/:id', protectAdmin, deleteReviewAdmin);

module.exports = router;

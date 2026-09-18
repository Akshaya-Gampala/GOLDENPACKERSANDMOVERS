const Review = require('../models/Review');

// Initial seed reviews data if database has no reviews yet
const INITIAL_SEED_REVIEWS = [
  {
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@example.com',
    rating: 5,
    comment: 'Excellent packing and moving service! Golden Packers handled our household items with extreme care. Zero damage and on-time delivery. Highly recommended!',
    status: 'approved',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    name: 'P. Suresh Kumar',
    email: 'suresh.p@example.com',
    rating: 5,
    comment: 'Very professional team. They came equipped with high quality bubble wrap and heavy cardboard boxes. Unloading and placement was done smoothly without any hassle.',
    status: 'approved',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    name: 'Divya Reddi',
    email: 'divya.reddi@example.com',
    rating: 5,
    comment: 'Booked them for my office relocation. They completed the entire packing and moving overnight so our regular operations were not affected at all. Top-notch support!',
    status: 'approved',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
  },
  {
    name: 'Venkat Ramana',
    email: 'venkat.ramana@example.com',
    rating: 5,
    comment: 'Affordable pricing with transparent quotation upfront. No hidden charges at all. The driver and moving team were respectful, punctual, and handled delicate items with care.',
    status: 'approved',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
  },
];

// Helper to auto-seed initial reviews if database is empty
const seedInitialReviewsIfEmpty = async () => {
  try {
    const count = await Review.countDocuments();
    if (count === 0) {
      await Review.insertMany(INITIAL_SEED_REVIEWS);
      console.log('✅ Auto-seeded initial approved reviews into MongoDB');
    }
  } catch (err) {
    console.error('Error seeding initial reviews:', err);
  }
};

// @desc    Submit a new customer review (Status: pending)
// @route   POST /api/reviews
// @access  Public
exports.submitReview = async (req, res) => {
  try {
    const { name, email, rating, comment } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Customer name is required' });
    }

    if (!rating || isNaN(rating) || Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({ success: false, message: 'Please select a valid star rating between 1 and 5' });
    }

    if (!comment || typeof comment !== 'string' || !comment.trim()) {
      return res.status(400).json({ success: false, message: 'Review comment cannot be empty' });
    }

    // Create review with default pending status
    const review = await Review.create({
      name: name.trim(),
      email: email ? email.trim() : '',
      rating: Number(rating),
      comment: comment.trim(),
      status: 'pending',
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for your review! It has been submitted and is pending administrator approval.',
      data: review,
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    return res.status(500).json({ success: false, message: 'Server error submitting review' });
  }
};

// @desc    Get all APPROVED reviews for public site + calculate dynamic average rating
// @route   GET /api/reviews
// @access  Public
exports.getApprovedReviews = async (req, res) => {
  try {
    await seedInitialReviewsIfEmpty();

    const approvedReviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 });

    const totalCount = approvedReviews.length;
    let averageRating = 5.0;

    if (totalCount > 0) {
      const sum = approvedReviews.reduce((acc, r) => acc + r.rating, 0);
      averageRating = Number((sum / totalCount).toFixed(1));
    }

    return res.status(200).json({
      success: true,
      count: totalCount,
      averageRating,
      data: approvedReviews,
    });
  } catch (error) {
    console.error('Error fetching approved reviews:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching reviews' });
  }
};

// @desc    Get all reviews for Admin Dashboard (Pending, Approved, Rejected)
// @route   GET /api/reviews/admin
// @access  Private (Admin)
exports.getAllReviewsAdmin = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status && status !== 'All') {
      filter.status = status.toLowerCase();
    }

    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    const pendingCount = await Review.countDocuments({ status: 'pending' });
    const approvedCount = await Review.countDocuments({ status: 'approved' });
    const rejectedCount = await Review.countDocuments({ status: 'rejected' });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      stats: {
        total: await Review.countDocuments(),
        pending: pendingCount,
        approved: approvedCount,
        rejected: rejectedCount,
      },
      data: reviews,
    });
  } catch (error) {
    console.error('Error fetching admin reviews:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching admin reviews' });
  }
};

// @desc    Update review status (Approve / Reject)
// @route   PUT /api/reviews/:id/status
// @access  Private (Admin)
exports.updateReviewStatusAdmin = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    return res.status(200).json({
      success: true,
      message: `Review status updated to ${status}`,
      data: review,
    });
  } catch (error) {
    console.error('Error updating review status:', error);
    return res.status(500).json({ success: false, message: 'Server error updating review status' });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private (Admin)
exports.deleteReviewAdmin = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Review permanently deleted',
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    return res.status(500).json({ success: false, message: 'Server error deleting review' });
  }
};

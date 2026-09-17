const express = require('express');
const router = express.Router();
const {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
} = require('../controllers/quoteController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/', createQuote);
router.get('/', protectAdmin, getQuotes);
router.get('/:id', protectAdmin, getQuoteById);
router.put('/:id', protectAdmin, updateQuote);
router.delete('/:id', protectAdmin, deleteQuote);

module.exports = router;

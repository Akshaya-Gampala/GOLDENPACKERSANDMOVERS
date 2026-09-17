const express = require('express');
const router = express.Router();
const {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
} = require('../controllers/contactController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/', createContactMessage);
router.get('/', protectAdmin, getContactMessages);
router.delete('/:id', protectAdmin, deleteContactMessage);

module.exports = router;

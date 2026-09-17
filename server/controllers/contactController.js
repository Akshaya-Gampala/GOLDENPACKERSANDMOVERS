const ContactMessage = require('../models/ContactMessage');

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
const createContactMessage = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, phone number, and message',
      });
    }

    const newMessage = await ContactMessage.create({
      name,
      phone,
      email: email || '',
      subject: subject || 'General Inquiry',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! We will contact you soon.',
      data: newMessage,
    });
  } catch (error) {
    console.error('Contact Submit Error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit contact message' });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin)
const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch contact messages' });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Contact message not found' });
    }

    res.status(200).json({ success: true, message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete contact message' });
  }
};

module.exports = {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
};

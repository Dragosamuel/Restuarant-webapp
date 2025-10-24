const express = require('express');
const router = express.Router();
const { 
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.route('/').post(createContactMessage);
router.route('/:id').get(getContactMessageById);

// Admin routes
router.route('/').get(protect, admin, getAllContactMessages);
router.route('/:id').put(protect, admin, updateContactMessage).delete(protect, admin, deleteContactMessage);

module.exports = router;
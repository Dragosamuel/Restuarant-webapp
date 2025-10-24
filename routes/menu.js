const express = require('express');
const router = express.Router();
const { 
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.route('/').get(getAllMenuItems);
router.route('/:id').get(getMenuItemById);

// Admin routes
router.route('/').post(protect, admin, createMenuItem);
router.route('/:id').put(protect, admin, updateMenuItem).delete(protect, admin, deleteMenuItem);

module.exports = router;
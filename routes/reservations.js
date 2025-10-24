const express = require('express');
const router = express.Router();
const { 
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation
} = require('../controllers/reservationController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.route('/').post(createReservation);
router.route('/:id').get(getReservationById);

// Admin routes
router.route('/').get(protect, admin, getAllReservations);
router.route('/:id').put(protect, admin, updateReservation).delete(protect, admin, deleteReservation);

module.exports = router;
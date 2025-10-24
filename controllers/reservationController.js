const Reservation = require('../models/Reservation');
const nodemailer = require('nodemailer');

// Create a new reservation
const createReservation = async (req, res) => {
  try {
    const { name, email, date, numberOfPeople, specialRequest } = req.body;

    // Create new reservation
    const reservation = new Reservation({
      name,
      email,
      date,
      numberOfPeople,
      specialRequest
    });

    // Save reservation
    const savedReservation = await reservation.save();

    // Send confirmation email (optional)
    // sendConfirmationEmail(savedReservation);

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: savedReservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating reservation',
      error: error.message
    });
  }
};

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reservations',
      error: error.message
    });
  }
};

// Get reservation by ID
const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reservation',
      error: error.message
    });
  }
};

// Update reservation status
const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reservation updated successfully',
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating reservation',
      error: error.message
    });
  }
};

// Delete reservation
const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reservation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting reservation',
      error: error.message
    });
  }
};

// Send confirmation email (optional)
const sendConfirmationEmail = async (reservation) => {
  try {
    // Only send email if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return;
    }

    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: reservation.email,
      subject: 'Restaurant Reservation Confirmation',
      text: `Hello ${reservation.name},

Your reservation for ${reservation.numberOfPeople} people on ${reservation.date} has been received.

Thank you for choosing our restaurant!

Best regards,
The Restaurant Team`
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation
};
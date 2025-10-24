const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Create a new contact message
const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create new contact message
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    // Save contact message
    const savedContact = await contact.save();

    // Send notification email to admin (optional)
    // sendNotificationEmail(savedContact);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: savedContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
};

// Get all contact messages
const getAllContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: error.message
    });
  }
};

// Get contact message by ID
const getContactMessageById = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching message',
      error: error.message
    });
  }
};

// Update message status
const updateContactMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message updated successfully',
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating message',
      error: error.message
    });
  }
};

// Delete contact message
const deleteContactMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting message',
      error: error.message
    });
  }
};

// Send notification email to admin (optional)
const sendNotificationEmail = async (contact) => {
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
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Message: ${contact.subject}`,
      text: `You have received a new message from ${contact.name} (${contact.email}):\n\n${contact.message}`
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
};

module.exports = {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage
};
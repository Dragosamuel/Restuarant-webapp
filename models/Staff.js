const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  shiftType: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', 'night'],
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  }
});

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true,
    enum: ['manager', 'chef', 'waiter', 'host', 'bartender', 'cashier', 'cleaner', 'other']
  },
  department: {
    type: String,
    required: true,
    enum: ['kitchen', 'front-of-house', 'management', 'support']
  },
  hireDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'on-leave', 'terminated'],
    default: 'active'
  },
  shifts: [shiftSchema],
  performance: {
    attendanceRate: {
      type: Number,
      default: 100
    },
    punctuality: {
      type: Number,
      default: 100
    },
    overallRating: {
      type: Number,
      default: 5
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Staff', staffSchema);
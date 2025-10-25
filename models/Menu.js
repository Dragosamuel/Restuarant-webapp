const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['breakfast', 'lunch', 'dinner', 'drinks', 'desserts']
  },
  image: {
    type: String,
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  // AR model data
  arModel: {
    modelUrl: {
      type: String,
      trim: true
    },
    modelType: {
      type: String,
      enum: ['glb', 'gltf', 'obj', 'fbx'],
      trim: true
    },
    thumbnail: {
      type: String,
      trim: true
    },
    dimensions: {
      width: Number,
      height: Number,
      depth: Number
    }
  },
  // Voice command keyword
  voiceKeyword: {
    type: String,
    trim: true
  },
  // Accessibility features
  accessibility: {
    audioDescription: {
      type: String,
      trim: true
    },
    highContrast: {
      type: Boolean,
      default: false
    },
    screenReaderText: {
      type: String,
      trim: true
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Menu', menuSchema);
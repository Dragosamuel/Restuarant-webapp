const Menu = require('../models/Menu');

// Create a new menu item
const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image, isAvailable, arModel, voiceKeyword, accessibility } = req.body;

    // Create new menu item
    const menuItem = new Menu({
      name,
      description,
      price,
      category,
      image,
      isAvailable,
      arModel,
      voiceKeyword,
      accessibility
    });

    // Save menu item
    const savedMenuItem = await menuItem.save();

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: savedMenuItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating menu item',
      error: error.message
    });
  }
};

// Get all menu items
const getAllMenuItems = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const menuItems = await Menu.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching menu items',
      error: error.message
    });
  }
};

// Get menu item by ID
const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching menu item',
      error: error.message
    });
  }
};

// Update menu item
const updateMenuItem = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // Handle nested objects properly
    if (req.body.arModel) {
      updateData.arModel = {};
      if (req.body.arModel.modelUrl !== undefined) updateData.arModel.modelUrl = req.body.arModel.modelUrl;
      if (req.body.arModel.modelType !== undefined) updateData.arModel.modelType = req.body.arModel.modelType;
      if (req.body.arModel.thumbnail !== undefined) updateData.arModel.thumbnail = req.body.arModel.thumbnail;
      
      if (req.body.arModel.dimensions) {
        updateData.arModel.dimensions = {};
        if (req.body.arModel.dimensions.width !== undefined) updateData.arModel.dimensions.width = req.body.arModel.dimensions.width;
        if (req.body.arModel.dimensions.height !== undefined) updateData.arModel.dimensions.height = req.body.arModel.dimensions.height;
        if (req.body.arModel.dimensions.depth !== undefined) updateData.arModel.dimensions.depth = req.body.arModel.dimensions.depth;
        
        // Remove dimensions if empty
        if (Object.keys(updateData.arModel.dimensions).length === 0) {
          delete updateData.arModel.dimensions;
        }
      }
      
      // Remove arModel if empty
      if (Object.keys(updateData.arModel).length === 0) {
        delete updateData.arModel;
      }
    }

    // Handle accessibility object
    if (req.body.accessibility) {
      updateData.accessibility = {};
      if (req.body.accessibility.audioDescription !== undefined) updateData.accessibility.audioDescription = req.body.accessibility.audioDescription;
      if (req.body.accessibility.highContrast !== undefined) updateData.accessibility.highContrast = req.body.accessibility.highContrast;
      if (req.body.accessibility.screenReaderText !== undefined) updateData.accessibility.screenReaderText = req.body.accessibility.screenReaderText;
      
      // Remove accessibility if empty
      if (Object.keys(updateData.accessibility).length === 0) {
        delete updateData.accessibility;
      }
    }

    const menuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      data: menuItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating menu item',
      error: error.message
    });
  }
};

// Delete menu item
const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting menu item',
      error: error.message
    });
  }
};

module.exports = {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem
};
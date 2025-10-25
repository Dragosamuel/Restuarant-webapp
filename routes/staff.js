const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const auth = require('../middleware/auth');

// Get all staff members
router.get('/', auth, async (req, res) => {
  try {
    // Only admin can access
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin only.' 
      });
    }

    const staff = await Staff.find().sort({ name: 1 });
    res.json({ 
      success: true, 
      data: staff 
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching staff members' 
    });
  }
});

// Get staff member by ID
router.get('/:id', auth, async (req, res) => {
  try {
    // Only admin can access
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin only.' 
      });
    }

    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ 
        success: false, 
        message: 'Staff member not found' 
      });
    }

    res.json({ 
      success: true, 
      data: staff 
    });
  } catch (error) {
    console.error('Error fetching staff member:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching staff member' 
    });
  }
});

// Create new staff member
router.post('/', auth, async (req, res) => {
  try {
    // Only admin can access
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin only.' 
      });
    }

    const { name, email, phone, position, department, hireDate } = req.body;

    // Check if staff member already exists
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ 
        success: false, 
        message: 'Staff member with this email already exists' 
      });
    }

    const staff = new Staff({
      name,
      email,
      phone,
      position,
      department,
      hireDate: new Date(hireDate)
    });

    const savedStaff = await staff.save();
    res.status(201).json({ 
      success: true, 
      data: savedStaff,
      message: 'Staff member created successfully' 
    });
  } catch (error) {
    console.error('Error creating staff member:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating staff member' 
    });
  }
});

// Update staff member
router.put('/:id', auth, async (req, res) => {
  try {
    // Only admin can access
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin only.' 
      });
    }

    const { name, email, phone, position, department, hireDate, status } = req.body;

    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ 
        success: false, 
        message: 'Staff member not found' 
      });
    }

    // Update fields
    if (name) staff.name = name;
    if (email) staff.email = email;
    if (phone) staff.phone = phone;
    if (position) staff.position = position;
    if (department) staff.department = department;
    if (hireDate) staff.hireDate = new Date(hireDate);
    if (status) staff.status = status;

    const updatedStaff = await staff.save();
    res.json({ 
      success: true, 
      data: updatedStaff,
      message: 'Staff member updated successfully' 
    });
  } catch (error) {
    console.error('Error updating staff member:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating staff member' 
    });
  }
});

// Delete staff member
router.delete('/:id', auth, async (req, res) => {
  try {
    // Only admin can access
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin only.' 
      });
    }

    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ 
        success: false, 
        message: 'Staff member not found' 
      });
    }

    await staff.remove();
    res.json({ 
      success: true, 
      message: 'Staff member deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting staff member' 
    });
  }
});

// Add shift to staff member
router.post('/:id/shifts', auth, async (req, res) => {
  try {
    // Only admin can access
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin only.' 
      });
    }

    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ 
        success: false, 
        message: 'Staff member not found' 
      });
    }

    const { date, startTime, endTime, shiftType } = req.body;
    const shift = {
      date: new Date(date),
      startTime,
      endTime,
      shiftType
    };

    staff.shifts.push(shift);
    const updatedStaff = await staff.save();

    res.json({ 
      success: true, 
      data: updatedStaff,
      message: 'Shift added successfully' 
    });
  } catch (error) {
    console.error('Error adding shift:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error adding shift' 
    });
  }
});

// Update shift status
router.put('/:id/shifts/:shiftId', auth, async (req, res) => {
  try {
    // Only admin can access
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin only.' 
      });
    }

    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ 
        success: false, 
        message: 'Staff member not found' 
      });
    }

    const shift = staff.shifts.id(req.params.shiftId);
    if (!shift) {
      return res.status(404).json({ 
        success: false, 
        message: 'Shift not found' 
      });
    }

    const { status } = req.body;
    if (status) shift.status = status;

    const updatedStaff = await staff.save();
    res.json({ 
      success: true, 
      data: updatedStaff,
      message: 'Shift updated successfully' 
    });
  } catch (error) {
    console.error('Error updating shift:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating shift' 
    });
  }
});

// Update performance metrics
router.put('/:id/performance', auth, async (req, res) => {
  try {
    // Only admin can access
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin only.' 
      });
    }

    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ 
        success: false, 
        message: 'Staff member not found' 
      });
    }

    const { attendanceRate, punctuality, overallRating } = req.body;
    
    if (attendanceRate !== undefined) staff.performance.attendanceRate = attendanceRate;
    if (punctuality !== undefined) staff.performance.punctuality = punctuality;
    if (overallRating !== undefined) staff.performance.overallRating = overallRating;

    const updatedStaff = await staff.save();
    res.json({ 
      success: true, 
      data: updatedStaff,
      message: 'Performance metrics updated successfully' 
    });
  } catch (error) {
    console.error('Error updating performance metrics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating performance metrics' 
    });
  }
});

module.exports = router;
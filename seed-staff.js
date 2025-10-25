// Seed script to add sample staff data
const mongoose = require('mongoose');
const Staff = require('./models/Staff');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Sample staff data
const sampleStaff = [
  {
    name: 'John Manager',
    email: 'john.manager@restoran.com',
    phone: '123-456-7890',
    position: 'manager',
    department: 'management',
    hireDate: new Date('2023-01-15'),
    status: 'active',
    performance: {
      attendanceRate: 98,
      punctuality: 95,
      overallRating: 4.8
    }
  },
  {
    name: 'Sarah Chef',
    email: 'sarah.chef@restoran.com',
    phone: '123-456-7891',
    position: 'chef',
    department: 'kitchen',
    hireDate: new Date('2023-03-22'),
    status: 'active',
    performance: {
      attendanceRate: 100,
      punctuality: 99,
      overallRating: 4.9
    }
  },
  {
    name: 'Mike Waiter',
    email: 'mike.waiter@restoran.com',
    phone: '123-456-7892',
    position: 'waiter',
    department: 'front-of-house',
    hireDate: new Date('2023-05-10'),
    status: 'active',
    performance: {
      attendanceRate: 95,
      punctuality: 90,
      overallRating: 4.5
    }
  },
  {
    name: 'Lisa Host',
    email: 'lisa.host@restoran.com',
    phone: '123-456-7893',
    position: 'host',
    department: 'front-of-house',
    hireDate: new Date('2023-06-01'),
    status: 'active',
    performance: {
      attendanceRate: 97,
      punctuality: 98,
      overallRating: 4.7
    }
  },
  {
    name: 'David Bartender',
    email: 'david.bartender@restoran.com',
    phone: '123-456-7894',
    position: 'bartender',
    department: 'front-of-house',
    hireDate: new Date('2023-07-15'),
    status: 'active',
    performance: {
      attendanceRate: 96,
      punctuality: 92,
      overallRating: 4.6
    }
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restoran', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');
  
  try {
    // Clear existing staff data
    await Staff.deleteMany({});
    console.log('Cleared existing staff data');
    
    // Insert sample staff data
    const insertedStaff = await Staff.insertMany(sampleStaff);
    console.log(`Inserted ${insertedStaff.length} staff members`);
    
    // Add sample shifts to staff members
    for (let i = 0; i < insertedStaff.length; i++) {
      const staff = insertedStaff[i];
      
      // Add sample shifts for the next week
      const shifts = [];
      for (let j = 1; j <= 7; j++) {
        const date = new Date();
        date.setDate(date.getDate() + j);
        
        shifts.push({
          date: date,
          startTime: '09:00',
          endTime: '17:00',
          shiftType: j % 2 === 0 ? 'morning' : 'afternoon',
          status: 'scheduled'
        });
      }
      
      staff.shifts = shifts;
      await staff.save();
    }
    
    console.log('Added sample shifts to staff members');
    console.log('Staff seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding staff data:', error);
    process.exit(1);
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
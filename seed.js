const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Menu = require('./models/Menu');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restoran', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Sample menu items
const menuItems = [
  {
    name: 'Chicken Burger',
    description: 'Delicious chicken burger with fresh vegetables',
    price: 12.99,
    category: 'lunch',
    image: 'img/menu-1.jpg',
    isAvailable: true
  },
  {
    name: 'Beef Steak',
    description: 'Juicy beef steak with mashed potatoes',
    price: 19.99,
    category: 'dinner',
    image: 'img/menu-2.jpg',
    isAvailable: true
  },
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with caesar dressing',
    price: 8.99,
    category: 'lunch',
    image: 'img/menu-3.jpg',
    isAvailable: true
  },
  {
    name: 'Pancakes',
    description: 'Fluffy pancakes with maple syrup',
    price: 7.99,
    category: 'breakfast',
    image: 'img/menu-4.jpg',
    isAvailable: true
  },
  {
    name: 'Fruit Smoothie',
    description: 'Refreshing fruit smoothie with banana and berries',
    price: 5.99,
    category: 'drinks',
    image: 'img/menu-5.jpg',
    isAvailable: true
  },
  {
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with vanilla ice cream',
    price: 6.99,
    category: 'desserts',
    image: 'img/menu-6.jpg',
    isAvailable: true
  }
];

// Sample admin user
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin'
};

// Seed database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Menu.deleteMany();
    await User.deleteMany();
    
    // Insert menu items
    await Menu.insertMany(menuItems);
    console.log('Menu items inserted');
    
    // Insert admin user
    await User.create(adminUser);
    console.log('Admin user created');
    
    console.log('Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();
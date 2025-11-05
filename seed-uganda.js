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

// Ugandan menu items
const menuItems = [
  {
    name: 'Luwombo',
    description: 'Traditional steamed dish with chicken or meat in banana leaves, served with steamed matooke',
    price: 25000,
    category: 'lunch',
    image: 'img/menu-luwombo.jpg',
    isAvailable: true,
    spicyLevel: 'medium',
    isSignatureDish: true
  },
  {
    name: 'Malewa',
    description: 'Traditional bamboo shoots dish from Eastern Uganda',
    price: 18000,
    category: 'lunch',
    image: 'img/menu-malewa.jpg',
    isAvailable: true,
    spicyLevel: 'mild',
    isLocal: true
  },
  {
    name: 'Eshabwe',
    description: 'Traditional ghee-based sauce from Western Uganda served with boiled plantains',
    price: 20000,
    category: 'lunch',
    image: 'img/menu-eshabwe.jpg',
    isAvailable: true,
    isSignatureDish: true
  },
  {
    name: 'Matooke',
    description: 'Steamed and mashed green bananas served with groundnut sauce',
    price: 15000,
    category: 'lunch',
    image: 'img/menu-matooke.jpg',
    isAvailable: true
  },
  {
    name: 'Posho and Bean Stew',
    description: 'Traditional cornmeal dish served with seasoned bean stew',
    price: 12000,
    category: 'lunch',
    image: 'img/menu-posho.jpg',
    isAvailable: true
  },
  {
    name: 'Rolex',
    description: 'Popular street food made with eggs and chapati',
    price: 8000,
    category: 'breakfast',
    image: 'img/menu-rolex.jpg',
    isAvailable: true
  },
  {
    name: 'Katogo',
    description: 'Traditional breakfast with matooke, offals, and vegetables',
    price: 18000,
    category: 'breakfast',
    image: 'img/menu-katogo.jpg',
    isAvailable: true
  },
  {
    name: 'Fish Mukene',
    description: 'Small silver fish served with vegetables',
    price: 20000,
    category: 'dinner',
    image: 'img/menu-mukene.jpg',
    isAvailable: true
  },
  {
    name: 'Uganda Waragi Cocktail',
    description: 'Traditional Ugandan gin-based cocktail',
    price: 5000,
    category: 'drinks',
    image: 'img/menu-waragi.jpg',
    isAvailable: true
  },
  {
    name: 'Ajono',
    description: 'Traditional millet and sorghum beer from Northern Uganda',
    price: 6000,
    category: 'drinks',
    image: 'img/menu-ajono.jpg',
    isAvailable: true
  },
  {
    name: 'Kalo',
    description: 'Traditional millet bread served with groundnut sauce',
    price: 12000,
    category: 'lunch',
    image: 'img/menu-kalo.jpg',
    isAvailable: true
  },
  {
    name: 'Mandazi',
    description: 'East African doughnuts served with African tea',
    price: 5000,
    category: 'breakfast',
    image: 'img/menu-mandazi.jpg',
    isAvailable: true
  },
  {
    name: 'Muchomo',
    description: 'Grilled meat skewers served with spicy sauce',
    price:2000,
    category: 'dinner',
    image: 'img/menu-muchomo.jpg',
    isAvailable: true,
    spicyLevel: 'hot'
  }
];

// Function to seed the database
const seedDB = async () => {
  try {
    // Clear existing menu items
    await Menu.deleteMany({});
    
    // Insert new menu items
    await Menu.insertMany(menuItems);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

// Run the seeding operation
seedDB();
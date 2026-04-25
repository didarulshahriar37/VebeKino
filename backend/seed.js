const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./src/models/User');
const Product = require('./src/models/Product');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Seed Admin
    const admin = new User({
      email: 'admin@vebe-kino.com',
      password: 'admin@VebeKino',
      role: 'admin',
      name: 'Admin',
      is_verified: true
    });
    await admin.save();
    console.log('Admin seeded.');

    // Seed Products
    const products = [
      {
        name: 'Zenith Smart Watch',
        description: 'Premium smartwatch with heart rate monitoring.',
        price: 199.99,
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000',
        category: 'Electronics',
        rating: 4.8,
        is_popular: true
      },
      {
        name: 'Aura Headphones',
        description: 'Noise cancelling high-fidelity audio.',
        price: 299.99,
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
        category: 'Audio',
        rating: 4.9,
        is_popular: true
      },
      {
        name: 'Vanguard Camera',
        description: 'Professional DSLR with 4K video.',
        price: 849.99,
        image_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1000',
        category: 'Photography',
        rating: 4.7,
        is_popular: false
      },
      {
        name: 'Nebula Mouse',
        description: 'Responsive gaming mouse with RGB.',
        price: 79.99,
        image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000',
        category: 'Gaming',
        rating: 4.5,
        is_popular: true
      }
    ];
    await Product.insertMany(products);
    console.log('Products seeded.');

    mongoose.connection.close();
    console.log('Seeding complete.');
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedData();

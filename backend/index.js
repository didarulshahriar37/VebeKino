const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./src/routes/auth.routes');
const adminRoutes = require('./src/routes/admin.routes');
const productRoutes = require('./src/routes/products.routes');
const cartRoutes = require('./src/routes/cart.routes');
const queueRoutes = require('./src/routes/queue.routes');
const orderRoutes = require('./src/routes/orders.routes');
const paymentRoutes = require('./src/routes/payment.routes');
const unlockUsers = require('./src/jobs/unlockUsers');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/queue', queueRoutes);
app.use('/orders', orderRoutes);
app.use('/payment', paymentRoutes);

// Start cron jobs
unlockUsers();

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Vebe Kino API is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
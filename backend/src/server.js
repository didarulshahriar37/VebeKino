const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

// Connect to Database
connectDB();

require('./cron/queueCron');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const signupRoute     = require('./routes/signup');
const verifyOtpRoute  = require('./routes/verify-otp');
const shareRoute      = require('./routes/share-click');
const statusRoute     = require('./routes/status');
const adminRoute      = require('./routes/admin');
const loginRoute      = require('./routes/login');
const productsRoute   = require('./routes/products');
const finalAccessRoute = require('./routes/final-access');
const prosConsRoute    = require('./routes/generate-pros-cons');
const cartRoute        = require('./routes/cart');
const queueRoute       = require('./routes/queue');
const paymentRoute     = require('./routes/payment');

app.use('/signup',             signupRoute);
app.use('/verify-otp',        verifyOtpRoute);
app.use('/share-click',       shareRoute);
app.use('/status',            statusRoute);
app.use('/admin',             adminRoute);
app.use('/login',             loginRoute);
app.use('/final-access',      finalAccessRoute);
app.use('/generate-pros-cons', prosConsRoute);
app.use('/products',          productsRoute);
app.use('/cart',              cartRoute);
app.use('/queue',             queueRoute);
app.use('/payment',           paymentRoute);

app.get('/', (req, res) => res.json({ status: 'Vebe Kino backend running on MongoDB' }));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

const app = express();

// Connect to Database
connectDB();

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

app.use('/signup',      signupRoute);
app.use('/verify-otp', verifyOtpRoute);
app.use('/share-click', shareRoute);
app.use('/status',      statusRoute);
app.use('/admin',       adminRoute);
app.use('/login',       loginRoute);
app.use('/products',    productsRoute);

app.get('/', (req, res) => res.json({ status: 'Vebe Kino backend running on MongoDB' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
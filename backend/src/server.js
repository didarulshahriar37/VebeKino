require('dotenv').config();
const express = require('express');
const signupRoute = require('./routes/signup');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: parse JSON bodies from incoming requests
app.use(express.json());

// Mount routes
app.use('/signup', signupRoute);

// Health check
app.get('/', (req, res) => res.json({ status: 'Vebe Kino backend running' }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
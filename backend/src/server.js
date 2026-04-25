require('dotenv').config();
const express     = require('express');
const signupRoute     = require('./routes/signup');
const verifyRoute     = require('./routes/verify-otp');
const shareRoute      = require('./routes/share-click');
const statusRoute     = require('./routes/status');
const adminRoute      = require('./routes/admin');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/signup',      signupRoute);
app.use('/verify-otp',  verifyRoute);
app.use('/share-click', shareRoute);
app.use('/status',      statusRoute);
app.use('/admin',       adminRoute);

app.get('/', (req, res) => res.json({ status: 'Vebe Kino backend running' }));

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
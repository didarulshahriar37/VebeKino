require('dotenv').config();
const express     = require('express');
const signupRoute     = require('./routes/signup');
const verifyRoute     = require('./routes/verify-otp');
const shareRoute      = require('./routes/share-click');
const statusRoute     = require('./routes/status');
const adminRoute      = require('./routes/admin');
const finalAccessRoute = require('./routes/final-access');
const prosConsRoute    = require('./routes/generate-pros-cons');
const productsRoute    = require('./routes/products');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/signup',      signupRoute);
app.use('/verify-otp',  verifyRoute);
app.use('/share-click', shareRoute);
app.use('/status',      statusRoute);
app.use('/admin',       adminRoute);
app.use('/final-access', finalAccessRoute);
app.use('/generate-pros-cons', prosConsRoute);
app.use('/products',    productsRoute);

app.get('/', (req, res) => res.json({ status: 'Vebe Kino backend running' }));

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));

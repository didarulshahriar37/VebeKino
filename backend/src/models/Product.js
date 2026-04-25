const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image_url: { type: String },
  category: { type: String },
  rating: { type: Number, default: 0 },
  availability: { type: Boolean, default: true },
  is_popular: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

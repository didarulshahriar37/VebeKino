const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Delivered' }, // As requested by user "Our Customer service will .soon coontact you"
  paymentIntentId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);

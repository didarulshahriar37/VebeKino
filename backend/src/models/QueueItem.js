const mongoose = require('mongoose');

const queueItemSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image_url: { type: String },
  category: { type: String },
  quantity: { type: Number, default: 1 },
  
  // Anti-Impulse Journey State
  gate: { type: Number, default: 1 }, // 1: Mechanical, 2: Cognitive, 3: Social, 4: Creative, 5: Purchase Unlock
  
  // Gate 1: Mechanical Wait (48 Hours)
  lockedUntil: { type: Date, required: true },
  
  // Gate 2: Cognitive (AI Pros/Cons)
  prosConsGenerated: { type: Boolean, default: false },
  pros: [{ type: String }],
  cons: [{ type: String }],
  cognitivePassed: { type: Boolean, default: false },

  // Gate 3: Social Share
  sharesCount: { type: Number, default: 0 },
  socialFallbackTime: { type: Date },
  socialPassed: { type: Boolean, default: false },

  // Gate 4: Creative Justification
  creativeScore: { type: Number },
  creativeFeedback: { type: String },
  creativePassed: { type: Boolean, default: false },

}, { timestamps: true });

module.exports = mongoose.model('QueueItem', queueItemSchema);

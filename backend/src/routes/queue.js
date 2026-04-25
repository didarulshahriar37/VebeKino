const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const QueueItem = require('../models/QueueItem');

// Move entire cart to the anti-impulse Queue
router.post('/move-from-cart', async (req, res) => {
  try {
    const { userEmail } = req.body;
    
    // Find the user's cart
    const cart = await Cart.findOne({ userEmail });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Set lockedUntil to 2 minutes from now (for testing)
    const lockedUntil = new Date(Date.now() + 2 * 60 * 1000); 

    // Create QueueItems for each product in the cart
    const queueItemsToInsert = cart.items.map(item => ({
      userEmail,
      productId: item.productId,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      category: item.category,
      quantity: item.quantity,
      lockedUntil,
      gate: 1
    }));

    await QueueItem.insertMany(queueItemsToInsert);

    // Empty the cart
    cart.items = [];
    await cart.save();

    res.json({ message: 'Successfully moved to Queue', count: queueItemsToInsert.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's queue items
router.get('/:email', async (req, res) => {
  try {
    const queueItems = await QueueItem.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.json(queueItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete queue item (for testing purposes)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await QueueItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Queue item not found' });
    }
    res.json({ message: 'Queue item removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get single queue item
router.get('/item/:id', async (req, res) => {
  try {
    const item = await QueueItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Pass Gate 2 (Cognitive) - Mark as reviewed but stay in Gate 2
router.put('/:id/pass-gate-2', async (req, res) => {
  try {
    const item = await QueueItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (item.gate !== 2) return res.status(400).json({ error: 'Item is not at Gate 2' });

    // Mark as reviewed, but do not change the gate yet. User must click global proceed.
    item.cognitivePassed = true;
    await item.save();

    res.json({ message: 'Item reviewed successfully', item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Batch Proceed to Gate 3
router.put('/batch-pass-gate-2', async (req, res) => {
  try {
    const { userEmail } = req.body;
    
    // Move all gate 2 items that have cognitivePassed = true to Gate 3
    await QueueItem.updateMany(
      { userEmail, gate: 2, cognitivePassed: true },
      { $set: { gate: 3 } }
    );

    res.json({ message: 'Proceeded to Gate 3' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Gate 3: Global Social Share
router.put('/share', async (req, res) => {
  try {
    const { userEmail } = req.body;
    
    // Find all items at Gate 3 for this user
    const gate3Items = await QueueItem.find({ userEmail, gate: 3 });
    if (gate3Items.length === 0) {
      return res.status(400).json({ error: 'No items waiting for social share' });
    }

    // We use the first item to check the global state for this batch
    const stateItem = gate3Items[0];

    // Check if 1 minute cooldown is active
    if (stateItem.socialFallbackTime && new Date() < new Date(stateItem.socialFallbackTime)) {
      return res.status(429).json({ error: 'Share on cooldown. Wait 1 minute.' });
    }

    const newSharesCount = stateItem.sharesCount + 1;
    
    if (newSharesCount >= 5) {
      // Pass Gate 3 -> Move to Gate 4
      await QueueItem.updateMany(
        { userEmail, gate: 3 },
        { 
          $set: { 
            gate: 4, 
            sharesCount: newSharesCount, 
            socialPassed: true 
          } 
        }
      );
      res.json({ message: 'Gate 3 Passed. Moved to Gate 4.', sharesCount: newSharesCount, gate: 4 });
    } else {
      // Increment share and set 1 min cooldown
      const nextAllowedTime = new Date(Date.now() + 60 * 1000);
      await QueueItem.updateMany(
        { userEmail, gate: 3 },
        { 
          $set: { 
            sharesCount: newSharesCount, 
            socialFallbackTime: nextAllowedTime 
          } 
        }
      );
      res.json({ message: 'Share recorded', sharesCount: newSharesCount, nextAllowedTime, gate: 3 });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Gate 4: Creative Justification AI Scoring
const { GoogleGenerativeAI } = require('@google/generative-ai');
router.post('/:id/justify', async (req, res) => {
  try {
    const { justification } = req.body;
    const item = await QueueItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (item.gate !== 4) return res.status(400).json({ error: 'Item is not at Gate 4' });

    if (!justification) {
      return res.status(400).json({ error: 'Justification text is required' });
    }

    let score = 80;
    let feedback = "Excellent justification. You have proven you really need this.";

    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const prompt = `You are a strict anti-impulse buying AI coach. 
The user wants to buy "${item.name}" for $${item.price}.
They wrote this justification: "${justification}"

Evaluate their justification out of 100 based on necessity, emotional maturity, and long-term value.
If the justification is generic, impulsive, or weak, give a score below 70 and provide 1 sentence of constructive criticism.
If it is well-thought-out and responsible, give a score of 70 or higher and a short encouraging sentence.

Return ONLY a valid JSON string in this exact format, with no markdown formatting or code blocks:
{"score": 85, "feedback": "Your feedback here"}`;

        const result = await model.generateContent(prompt);
        let text = result.response.text().trim();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(text);
        score = parsed.score;
        feedback = parsed.feedback;
      } catch (aiErr) {
        console.error("AI Error:", aiErr);
        // Fallback to success if AI fails
      }
    }

    item.creativeScore = score;
    item.creativeFeedback = feedback;

    if (score >= 70) {
      item.gate = 5; // Passed!
      item.creativePassed = true;
      await item.save();
      return res.json({ success: true, score, feedback, message: 'Gate 4 Passed! Final Unlock.' });
    } else {
      await item.save();
      return res.json({ success: false, score, feedback });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Final Checkout - Clear Queue
router.delete('/clear/:email', async (req, res) => {
  try {
    await QueueItem.deleteMany({ userEmail: req.params.email });
    res.json({ message: 'Queue cleared successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

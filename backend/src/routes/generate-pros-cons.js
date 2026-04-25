const express   = require('express');
const router    = express.Router();
const supabase  = require('../db');
const checkLock = require('../middleware/checkLock');

// npm install @google/generative-ai
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function callAI(productName, price) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',

    // System instruction = same as "system" in Claude/OpenAI
    systemInstruction: `You are a helpful product analyst.
Respond ONLY with valid JSON. No preamble, no markdown backticks.
Format: { "pros": ["...", "...", "..."], "cons": ["...", "...", "..."] }`
  });

  const prompt = `Generate 3 pros and 3 cons for buying "${productName}" at $${price}.
Be specific and realistic. Each point should be 1 sentence.`;

  const result = await model.generateContent(prompt);
  const text   = result.response.text();

  // Gemini sometimes wraps output in ```json ... ```
  // This strips those backticks before parsing
  const clean = text.replace(/```json|```/g, '').trim();

  return JSON.parse(clean); // { pros: [...], cons: [...] }
}

// POST /generate-pros-cons
// Only verified, non-locked users with 5+ shares can call this
router.post('/', checkLock, async (req, res) => {
  const { email, product_name, price } = req.body;

  if (!email || !product_name || !price) {
    return res.status(400).json({ error: 'email, product_name, price required' });
  }

  // Gate check: must have is_verified + 5 shares
  const { data: user } = await supabase
    .from('users')
    .select('is_verified, share_count')
    .eq('email', email)
    .single();

  if (!user?.is_verified || user.share_count < 5) {
    return res.status(403).json({
      error: 'Complete OTP verification and 5 shares first'
    });
  }

  try {
    // Call the AI
    const result = await callClaude(product_name, price);

    // Store in Supabase for record-keeping
    await supabase.from('ai_results').insert({
      email,
      product_name,
      price:        parseFloat(price),
      pros:         result.pros,   // stored as JSON array
      cons:         result.cons,
      created_at:   new Date().toISOString()
    });

    // Return to frontend
    res.json({
      product_name,
      price,
      pros: result.pros,
      cons: result.cons
    });

  } catch (err) {
    console.error('AI error:', err.message);
    res.status(500).json({ error: 'AI generation failed. Try again.' });
  }
});

module.exports = router;
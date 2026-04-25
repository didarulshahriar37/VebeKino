const cron = require('node-cron');
const QueueItem = require('../models/QueueItem');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function generateProsCons(productName, price) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash', // or gemini-1.5-flash depending on availability
      systemInstruction: `You are a helpful product analyst. Respond ONLY with valid JSON. No preamble, no markdown backticks. Format: { "pros": ["...", "...", "..."], "cons": ["...", "...", "..."] }`
    });

    const prompt = `Generate 3 pros and 3 cons for buying "${productName}" at $${price}. Be specific and realistic. Each point should be 1 sentence.`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const clean = text.replace(/```json|```/g, '').trim();

    return JSON.parse(clean); 
  } catch (err) {
    console.error(`AI Generation failed for ${productName}:`, err);
    return { pros: ["Great product overall.", "High quality."], cons: ["A bit expensive.", "Wait time is long."] }; // Fallback
  }
}

// Check every minute
cron.schedule('* * * * *', async () => {
  try {
    // Find items stuck in Gate 1 where 48 hours have passed
    const now = new Date();
    const readyItems = await QueueItem.find({
      gate: 1,
      lockedUntil: { $lte: now }
    });

    if (readyItems.length > 0) {
      console.log(`[CRON] Found ${readyItems.length} items ready to unlock Gate 2.`);
    }

    for (const item of readyItems) {
      // Generate Pros/Cons
      const analysis = await generateProsCons(item.name, item.price);
      
      // Unlock Gate 2
      item.gate = 2;
      item.prosConsGenerated = true;
      item.pros = analysis.pros;
      item.cons = analysis.cons;

      await item.save();
      console.log(`[CRON] Unlocked Gate 2 for ${item.name} (${item.userEmail})`);
    }
  } catch (error) {
    console.error('[CRON Error]', error);
  }
});

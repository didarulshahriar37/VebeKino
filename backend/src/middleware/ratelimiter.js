// Simple in-memory rate limiter.
// Tracks how many times each email has called
// an endpoint within a rolling 60-second window.
const attempts = new Map(); // { email: [timestamp, timestamp, ...] }

const WINDOW_MS  = 60 * 1000; // 60 seconds
const MAX_CALLS  = 10;         // max 10 clicks per 60 seconds

function rateLimiter(req, res, next) {
  const { email } = req.body;
  if (!email) return next();

  const now  = Date.now();
  const key  = email.toLowerCase();
  const hits = attempts.get(key) || [];

  // Remove timestamps older than 60 seconds
  const recent = hits.filter(t => now - t < WINDOW_MS);

  if (recent.length >= MAX_CALLS) {
    return res.status(429).json({
      error: 'Too many requests',
      message: 'Slow down. Max 10 share clicks per 60 seconds.'
    });
  }

  // Record this request and continue
  recent.push(now);
  attempts.set(key, recent);
  next();
}

module.exports = rateLimiter;
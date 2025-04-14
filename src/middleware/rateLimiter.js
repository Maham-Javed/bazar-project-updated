import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redis from "../config/redis.js";

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 100, // Allow 100 requests per window
  standardHeaders: true, // Include rate limit info in response headers
  legacyHeaders: false, // Disable legacy headers (X-RateLimit-* for compatibility)
  store: new RedisStore({
    sendCommand: (...args) => redis.call(...args),
  }),
  // Custom message for rate-limiting error
  handler: (req, res) => {
    res.status(429).json({
      message: "Too many requests, please try again later.",
    });
  },
  // Optional: Add custom rate limit headers (this is a basic example)
  onLimitReached: (req, res) => {
    console.warn(`Rate limit exceeded for IP: ${req.ip}`);
  },
});

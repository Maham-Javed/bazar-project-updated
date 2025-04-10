import rateLimit from "express-rate-limit";

// Rate limiter configuration
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: (req, res) => {
    const retryAfter = Math.ceil(res.get("Retry-After") / 60);
    return `Too many requests. Please try again in ${retryAfter} minute(s).`;
  },
});

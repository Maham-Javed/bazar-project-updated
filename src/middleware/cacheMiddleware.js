import redis from "../config/redis.js";

export const cache = (keyPrefix) => async (req, res, next) => {
  try {
    // Key can include path and query string for better granularity
    const key =
      keyPrefix + req.originalUrl || req.path + JSON.stringify(req.query || {});

    // Check cache for data
    const cached = await redis.get(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    // Override res.json to cache the response
    res.sendResponse = res.json;
    res.json = (body) => {
      // Store in cache with an expiration time (e.g., 1 minute, or a configurable value)
      const cacheExpiration = 60; // You can make this dynamic based on route or config
      redis.set(key, JSON.stringify(body), "EX", cacheExpiration, (err) => {
        if (err) {
          console.error("Redis caching error:", err);
        }
      });
      res.sendResponse(body);
    };

    next();
  } catch (err) {
    console.error("Cache middleware error:", err);
    next();
  }
};

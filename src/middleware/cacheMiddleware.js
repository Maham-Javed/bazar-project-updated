import redis from "../config/redis.js";

export const cache = (keyPrefix) => async (req, res, next) => {
  const key = keyPrefix + JSON.stringify(req.query || {});
  const cached = await redis.get(key);
  if (cached) return res.json(JSON.parse(cached));

  res.sendResponse = res.json;
  res.json = (body) => {
    redis.set(key, JSON.stringify(body), "EX", 60); // cache for 1 min
    res.sendResponse(body);
  };
  next();
};

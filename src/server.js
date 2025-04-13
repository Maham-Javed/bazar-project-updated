import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import { limiter } from "./middleware/rateLimiter.js";
import { cache } from "./middleware/cacheMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { writeDB } from "./config/database.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", cache("products:"), productRoutes);
app.use("/api/stock", cache("stock:"), stockRoutes);

const PORT = process.env.PORT || 5000;

writeDB.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

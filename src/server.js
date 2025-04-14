import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import process from "process"; // For graceful shutdown

import { limiter } from "./middleware/rateLimiter.js";
import { cache } from "./middleware/cacheMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { writeDB } from "./config/database.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", cache("products:"), productRoutes);
app.use("/api/stock", cache("stock:"), stockRoutes);

// Validate environment variables
if (!process.env.JWT_SECRET || !process.env.DB_HOST || !process.env.DB_USER) {
  console.error("Missing essential environment variables");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

// Graceful shutdown handling
const gracefulShutdown = async () => {
  console.log("Shutting down gracefully...");
  try {
    await writeDB.close(); // Close the database connection gracefully
    process.exit(0); // Exit with a success code
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
    process.exit(1); // Exit with an error code
  }
};

// Handle termination signals for graceful shutdown
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

// Start the server
writeDB
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit if the DB connection fails
  });

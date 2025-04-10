import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { limiter } from "./middleware/rateLimiter.js";
import productRoutes from "./routes/productRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import sequelize from "./config/database.js";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet()); // Protect app from vulnerabilities
app.use(morgan("dev")); // Log incoming requests
app.use(limiter);

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stock", stockRoutes);

// Database sync (remove force: true in production)
sequelize
  .sync() // Consider using migrations in production
  .then(() => console.log("Database synced!"))
  .catch((err) => console.error("Sync error:", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

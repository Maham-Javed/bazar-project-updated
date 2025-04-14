import express from "express";
import { handleMovement, getReport } from "../controllers/stockController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { limiter } from "../middleware/rateLimiter.js"; // Optional rate-limiting middleware
import { validateStockMovement } from "../middleware/validateStockMovement.js"; // Example input validation middleware

const router = express.Router();

// POST route to handle stock movements (IN/SALE/REMOVE) with authentication and validation
router.post(
  "/",
  authMiddleware,
  validateStockMovement,
  limiter,
  handleMovement
);

// GET route to fetch filtered report with authentication and rate-limiting (add pagination/filtering if needed)
router.get("/report", authMiddleware, limiter, getReport);

export default router;

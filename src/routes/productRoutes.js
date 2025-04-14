import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { limiter } from "../middleware/rateLimiter.js";
import { validateProductInput } from "../middleware/validateProductInput.js"; // Example of input validation middleware

const router = express.Router();

// POST route to create a product with validation, authentication, and rate-limiting
router.post("/", authMiddleware, validateProductInput, limiter, createProduct);

// GET route to fetch all products with authentication and rate-limiting (add pagination if necessary)
router.get("/", authMiddleware, limiter, getAllProducts);

export default router;

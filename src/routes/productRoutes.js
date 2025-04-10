import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { limiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", authMiddleware, limiter, createProduct);
router.get("/", authMiddleware, limiter, getAllProducts);

export default router;

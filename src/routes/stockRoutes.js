import express from "express";
import {
  stockIn,
  sellProduct,
  getReport,
  removeStock,
} from "../controllers/stockController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { limiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/in", authMiddleware, limiter, stockIn);
router.post("/sell", authMiddleware, limiter, sellProduct);
router.get("/report", authMiddleware, limiter, getReport);
router.post("/remove", authMiddleware, limiter, removeStock);

export default router;

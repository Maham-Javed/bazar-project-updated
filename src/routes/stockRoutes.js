import express from "express";
import { handleMovement, getReport } from "../controllers/stockController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, handleMovement); // for IN/SALE/REMOVE
router.get("/report", authMiddleware, getReport); // filtered report

export default router;

import express from "express";
import {
  stockIn,
  sellProduct,
  removeStock,
} from "../controllers/stockController.js";

const router = express.Router();

router.post("/in", stockIn);
router.post("/sell", sellProduct);
router.post("/remove", removeStock);

export default router;

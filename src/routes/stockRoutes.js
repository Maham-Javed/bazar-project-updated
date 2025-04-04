import express from "express";
import {
  stockIn,
  sellProduct,
  removeStock,
} from "../controllers/stockController.js";

const router = express.Router();

// Define routes for stock management

// Route to handle stock in
router.post("/in", stockIn);
// Route to add stock
router.post("/sell", sellProduct);
// Route to sell products
router.post("/remove", removeStock);

export default router;

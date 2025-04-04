import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";

const router = express.Router();

// Define routes for product management:

// Route to create a new product
router.post("/", createProduct);
// Route to create a new product
router.get("/", getAllProducts);

export default router;

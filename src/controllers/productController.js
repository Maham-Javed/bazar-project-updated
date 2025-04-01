import productService from "../services/productService.js";

async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllProducts(req, res) {
  const products = await productService.getAllProducts();
  res.json(products);
}

export { createProduct, getAllProducts };

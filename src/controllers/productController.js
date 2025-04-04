import productService from "../services/productService.js";

// This function creates a new product in the database and sends the created product as a JSON response.
async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// This function retrieves all products from the database and sends them as a JSON response.
async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { createProduct, getAllProducts };

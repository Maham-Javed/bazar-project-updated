import productService from "../services/productService.js";

// Create a new product
async function createProduct(req, res) {
  try {
    // Validate incoming data
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    // Call the service layer to create the product
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ error: error.message });
  }
}

// Get all products
async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.json({
      count: products.length,
      products: products, // Return the list of products along with the count
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
}

export { createProduct, getAllProducts };

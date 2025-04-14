import productService from "../services/productService.js";

// Create a new product
export async function createProduct(req, res) {
  try {
    const { name, price } = req.body;

    if (!name || typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Name and a valid price are required",
      });
    }

    const product = await productService.createProduct({ name, price });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
}

// Get all products
export async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
}

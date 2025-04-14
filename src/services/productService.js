import Product from "../models/Product.js";

// Create a new product
async function createProduct(data) {
  try {
    // Input validation
    if (!data.name || !data.sku || !data.price) {
      throw new Error(
        "Missing required fields: name, sku, and price are required."
      );
    }

    if (isNaN(data.price) || data.price <= 0) {
      throw new Error("Price must be a positive number.");
    }

    // Create product
    const product = await Product.create(data);
    return product;
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
}

// Get all products with pagination (default page = 1, limit = 10)
async function getAllProducts(page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;

    // Fetch products with pagination
    const products = await Product.findAll({
      limit: limit,
      offset: offset,
    });

    return products;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
}

export default { createProduct, getAllProducts };

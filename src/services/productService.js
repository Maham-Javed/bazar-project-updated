import Product from "../models/Product.js";

// Create a new product
async function createProduct(data) {
  try {
    if (!data.name || !data.sku || !data.price) {
      throw new Error(
        "Missing required fields: name, sku, and price are required."
      );
    }
    const product = await Product.create(data);
    return product;
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
}

async function getAllProducts(page = 1, limit = 10) {
  try {
    return await Product.findAll();
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
}

export default { createProduct, getAllProducts };

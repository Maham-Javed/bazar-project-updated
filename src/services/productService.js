import Product from "../models/Product.js";

// This service handles product-related operations such as creating a new product and fetching all products.
// It interacts with the Product model to perform database operations.

// This function creates a new product in the database.
async function createProduct(data) {
  return await Product.create(data);
}

// This function fetches all products from the database.
async function getAllProducts() {
  return await Product.findAll();
}

export default { createProduct, getAllProducts };

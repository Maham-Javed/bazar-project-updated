import Product from "../models/Product.js";

async function createProduct(data) {
  return await Product.create(data);
}

async function getAllProducts() {
  return await Product.findAll();
}

export default { createProduct, getAllProducts };

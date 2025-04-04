import StockMovement from "../models/StockMovement.js";
import Product from "../models/Product.js";

// This service handles stock movements such as stock in, selling products, and removing stock.

// This function creates a new stock movement in the database.
async function stockIn(productId, quantity) {
  const product = await Product.findByPk(productId);
  if (!product) throw new Error("Product not found");

  product.quantity += quantity;
  await product.save();

  return await StockMovement.create({ type: "IN", quantity, productId });
}

// This function handles selling products and updating stock accordingly.
async function sellProduct(productId, quantity) {
  const product = await Product.findByPk(productId);
  if (!product || product.quantity < quantity)
    throw new Error("Not enough stock");

  product.quantity -= quantity;
  await product.save();

  return await StockMovement.create({ type: "SALE", quantity, productId });
}

// This function handles removing stock and updating stock accordingly.
async function removeStock(productId, quantity) {
  const product = await Product.findByPk(productId);
  if (!product || product.quantity < quantity)
    throw new Error("Not enough stock");

  product.quantity -= quantity;
  await product.save();

  return await StockMovement.create({ type: "REMOVE", quantity, productId });
}

export default { stockIn, sellProduct, removeStock };

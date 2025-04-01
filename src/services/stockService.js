import StockMovement from "../models/StockMovement.js";
import Product from "../models/Product.js";

async function stockIn(productId, quantity) {
  const product = await Product.findByPk(productId);
  if (!product) throw new Error("Product not found");

  product.quantity += quantity;
  await product.save();

  return await StockMovement.create({ type: "IN", quantity, productId });
}

async function sellProduct(productId, quantity) {
  const product = await Product.findByPk(productId);
  if (!product || product.quantity < quantity)
    throw new Error("Not enough stock");

  product.quantity -= quantity;
  await product.save();

  return await StockMovement.create({ type: "SALE", quantity, productId });
}

async function removeStock(productId, quantity) {
  const product = await Product.findByPk(productId);
  if (!product || product.quantity < quantity)
    throw new Error("Not enough stock");

  product.quantity -= quantity;
  await product.save();

  return await StockMovement.create({ type: "REMOVE", quantity, productId });
}

export default { stockIn, sellProduct, removeStock };

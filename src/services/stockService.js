import StockMovement from "../models/StockMovement.js";
import { Product } from "../models/Product.js";
import sequelize from "../config/database.js"; // Assuming sequelize is configured

// Stock in function
async function stockIn(productId, quantity) {
  if (quantity <= 0) throw new Error("Quantity must be a positive number");

  const transaction = await sequelize.transaction();
  try {
    const product = await Product.findByPk(productId, { transaction });
    if (!product) throw new Error("Product not found");

    product.quantity += quantity;
    await product.save({ transaction });

    const stockMovement = await StockMovement.create(
      {
        type: "IN",
        quantity,
        productId,
      },
      { transaction }
    );

    await transaction.commit();
    return stockMovement;
  } catch (error) {
    await transaction.rollback();
    throw new Error("Error processing stock in: " + error.message);
  }
}

// Sell product function
async function sellProduct(productId, quantity) {
  if (quantity <= 0) throw new Error("Quantity must be a positive number");

  const transaction = await sequelize.transaction();
  try {
    const product = await Product.findByPk(productId, { transaction });
    if (!product || product.quantity < quantity)
      throw new Error("Not enough stock");

    product.quantity -= quantity;
    await product.save({ transaction });

    const stockMovement = await StockMovement.create(
      {
        type: "SALE",
        quantity,
        productId,
      },
      { transaction }
    );

    await transaction.commit();
    return stockMovement;
  } catch (error) {
    await transaction.rollback();
    throw new Error("Error processing sale: " + error.message);
  }
}

// Remove stock function
async function removeStock(productId, quantity) {
  if (quantity <= 0) throw new Error("Quantity must be a positive number");

  const transaction = await sequelize.transaction();
  try {
    const product = await Product.findByPk(productId, { transaction });
    if (!product || product.quantity < quantity)
      throw new Error("Not enough stock");

    product.quantity -= quantity;
    await product.save({ transaction });

    const stockMovement = await StockMovement.create(
      {
        type: "REMOVE",
        quantity,
        productId,
      },
      { transaction }
    );

    await transaction.commit();
    return stockMovement;
  } catch (error) {
    await transaction.rollback();
    throw new Error("Error removing stock: " + error.message);
  }
}

export default { stockIn, sellProduct, removeStock };

import { Op } from "sequelize";
import StockMovement from "../models/StockMovement.js";
import Product from "../models/Product.js";
import Store from "../models/Store.js";
import { readDB } from "../config/database.js";

export const getStockReport = async (storeId, startDate, endDate) => {
  const where = {};
  if (storeId) where.storeId = storeId;
  if (startDate && endDate) {
    where.date = { [Op.between]: [new Date(startDate), new Date(endDate)] };
  }

  return await StockMovement.findAll({
    where,
    include: [Product],
    transaction: await readDB.transaction(),
  });
};

export const recordMovement = async ({
  productId,
  storeId,
  type,
  quantity,
}) => {
  const product = await Product.findByPk(productId);
  const store = await Store.findByPk(storeId);

  if (!product) throw new Error("Product not found");
  if (!store) throw new Error("Store not found");

  if (type === "SALE" || type === "REMOVE") {
    // In a real implementation you'd want to track inventory per store
    // This assumes you're just validating that we don't go below 0
    const stockMovements = await StockMovement.findAll({
      where: { productId, storeId },
    });
    const currentStock = stockMovements.reduce((sum, m) => {
      if (m.type === "IN") return sum + m.quantity;
      if (m.type === "SALE" || m.type === "REMOVE") return sum - m.quantity;
      return sum;
    }, 0);

    if (currentStock < quantity) {
      throw new Error(`Not enough stock to ${type}`);
    }
  }

  return await StockMovement.create({ productId, storeId, quantity, type });
};

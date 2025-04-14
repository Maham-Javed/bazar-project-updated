import { Op } from "sequelize";
import StockMovement from "../models/StockMovement.js";
import Product from "../models/Product.js";
import Store from "../models/Store.js";
import { readDB, writeDB } from "../config/database.js";

// Get stock report with optional storeId, startDate, and endDate filters
export const getStockReport = async (storeId, startDate, endDate) => {
  try {
    const where = {};
    if (storeId) where.storeId = storeId;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid date format.");
      }
      where.date = { [Op.between]: [start, end] };
    }

    return await StockMovement.findAll({
      where,
      include: [Product],
    });
  } catch (error) {
    throw new Error("Error fetching stock report: " + error.message);
  }
};

// Record a stock movement (IN, SALE, REMOVE)
export const recordMovement = async ({
  productId,
  storeId,
  type,
  quantity,
}) => {
  const transaction = await writeDB.transaction();

  try {
    // Validate movement type
    const validTypes = ["IN", "SALE", "REMOVE"];
    if (!validTypes.includes(type)) {
      throw new Error(
        `Invalid movement type: ${type}. Valid types are ${validTypes.join(
          ", "
        )}.`
      );
    }

    const product = await Product.findByPk(productId);
    const store = await Store.findByPk(storeId);

    if (!product) throw new Error(`Product with id ${productId} not found`);
    if (!store) throw new Error(`Store with id ${storeId} not found`);

    if (type === "SALE" || type === "REMOVE") {
      // Track inventory levels for each store
      const stockMovements = await StockMovement.findAll({
        where: { productId, storeId },
        transaction,
      });
      const currentStock = stockMovements.reduce((sum, m) => {
        if (m.type === "IN") return sum + m.quantity;
        if (m.type === "SALE" || m.type === "REMOVE") return sum - m.quantity;
        return sum;
      }, 0);

      if (currentStock < quantity) {
        throw new Error(
          `Not enough stock to process ${type} for productId ${productId} in storeId ${storeId}`
        );
      }
    }

    // Create stock movement record
    const stockMovement = await StockMovement.create(
      { productId, storeId, quantity, type },
      { transaction }
    );

    // Commit transaction
    await transaction.commit();

    return stockMovement;
  } catch (error) {
    // Rollback transaction in case of error
    if (transaction) await transaction.rollback();
    throw new Error("Error recording stock movement: " + error.message);
  }
};

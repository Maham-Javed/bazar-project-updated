import { DataTypes } from "sequelize";
import { writeDB } from "../config/database.js";
import Product from "./Product.js";
import Store from "./Store.js";

const StockMovement = writeDB.define(
  "StockMovement",
  {
    type: {
      type: DataTypes.ENUM("IN", "SALE", "REMOVE"),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true, // Ensure quantity is an integer
        min: 1, // Quantity must be at least 1 for "IN" and "SALE"
      },
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    paranoid: true, // Optional: Enables soft deletes (adds deletedAt column)
    indexes: [
      { fields: ["productId"] }, // Index to improve queries by product
      { fields: ["storeId"] }, // Index to improve queries by store
    ],
  }
);

// Define associations AFTER model definitions
Product.hasMany(StockMovement, { foreignKey: "productId" });
StockMovement.belongsTo(Product, { foreignKey: "productId" });

Store.hasMany(StockMovement, { foreignKey: "storeId" });
StockMovement.belongsTo(Store, { foreignKey: "storeId" });

export default StockMovement;

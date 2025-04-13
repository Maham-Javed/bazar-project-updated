import { DataTypes } from "sequelize";
import { writeDB } from "../config/database.js";
import Product from "./Product.js";
import Store from "./Store.js";

const StockMovement = writeDB.define("StockMovement", {
  type: {
    type: DataTypes.ENUM("IN", "SALE", "REMOVE"),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// ✅ Define associations AFTER model definitions
Product.hasMany(StockMovement, { foreignKey: "productId" });
StockMovement.belongsTo(Product, { foreignKey: "productId" });

Store.hasMany(StockMovement, { foreignKey: "storeId" });
StockMovement.belongsTo(Store, { foreignKey: "storeId" });

export default StockMovement;

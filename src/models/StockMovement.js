import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Product from "./Product.js";

const StockMovement = sequelize.define(
  "StockMovement",
  {
    type: {
      type: DataTypes.ENUM("IN", "SALE", "REMOVE"),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Association
Product.hasMany(StockMovement, { foreignKey: "productId" });
StockMovement.belongsTo(Product, { foreignKey: "productId" });

export default StockMovement;

import { DataTypes } from "sequelize";
import { writeDB } from "../config/database.js";

const Product = writeDB.define("Product", {
  name: { type: DataTypes.STRING, allowNull: false },
  sku: { type: DataTypes.STRING, allowNull: false, unique: true },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

export default Product; // ✅ make sure you're exporting it

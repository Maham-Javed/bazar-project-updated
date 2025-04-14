import { DataTypes } from "sequelize";
import { writeDB } from "../config/database.js";

const Product = writeDB.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255], // Ensure name is between 1 and 255 characters
      },
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 100], // Ensure SKU is between 1 and 100 characters
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true, // Ensure it's a valid float
        min: 0, // Price can't be negative
      },
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
    tableName: "products", // Optional: If you want to use a specific table name
    indexes: [
      {
        unique: true,
        fields: ["sku"], // Index the sku for better query performance
      },
    ],
  }
);

export default Product;

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Store from "./Store.js";

// Product model definition
const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      // Stock Keeping Unit
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0.01, // Ensure price is greater than 0
      },
    },
  },
  { timestamps: true }
);

// StoreStock model definition (many-to-many relationship)
const StoreStock = sequelize.define(
  "StoreStock",
  {
    storeId: {
      type: DataTypes.INTEGER,
      references: { model: Store, key: "id" },
    },
    productId: {
      type: DataTypes.INTEGER,
      references: { model: Product, key: "id" },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0, // Ensure quantity is non-negative
      },
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["storeId", "productId"], // Ensure a store can't have duplicate products
      },
    ],
  }
);

// Many-to-many relationship definitions
Store.belongsToMany(Product, { through: StoreStock });
Product.belongsToMany(Store, { through: StoreStock });

export { Product, Store, StoreStock };

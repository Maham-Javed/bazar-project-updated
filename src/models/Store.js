import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Store = sequelize.define(
  "Store",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default Store;

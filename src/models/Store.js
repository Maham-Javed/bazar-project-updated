import { DataTypes } from "sequelize";
import { writeDB } from "../config/database.js";

const Store = writeDB.define(
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

import { DataTypes } from "sequelize";
import { writeDB } from "../config/database.js";

const Store = writeDB.define(
  "Store",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 255], // Ensure name length is between 1 and 255 characters
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255], // Ensure location length is between 1 and 255 characters
      },
    },
  },
  {
    timestamps: true, // Keep track of creation and update times
    paranoid: true, // Enable soft deletes (adds a deletedAt column)
    indexes: [
      { fields: ["name"] }, // Index name for fast searching
      { fields: ["location"] }, // Optional: Index location for fast searching
    ],
  }
);

export default Store;

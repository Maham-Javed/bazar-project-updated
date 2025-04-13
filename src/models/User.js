import { DataTypes } from "sequelize";
import { writeDB } from "../config/database.js";

const User = writeDB.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Make sure `id` is the primary key
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 255], // Password must be at least 8 characters long
    },
  },
});

export default User;

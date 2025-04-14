import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { writeDB } from "../config/database.js";

const User = writeDB.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50], // Username should be between 3 and 50 characters
        isAlphanumeric: true, // Ensure username is alphanumeric
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 255], // Password must be at least 8 characters long
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt columns
  }
);

// Hash the password before saving the user record
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10); // Hash password with salt rounds of 10
  }
});

// Method to compare entered password with the stored hashed password
User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default User;

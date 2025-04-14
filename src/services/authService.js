import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.js";

dotenv.config();

const auth_login = async (username, password) => {
  try {
    // Check if user exists in the database
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error("Authentication failed"); // Generic error message
    }

    // Compare the provided password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Authentication failed"); // Generic error message
    }

    // Generate JWT token with userId and username in payload
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY || "1h", // Make expiration configurable via .env
        jwtid: `jwt_${user.id}_${new Date().getTime()}`, // Optional: unique JWT ID
      }
    );

    return { token };
  } catch (error) {
    // Handle database or any unexpected errors
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export default auth_login;

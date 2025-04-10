import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.js";

dotenv.config();

const auth_login = async (username, password) => {
  // Check if user exists in the database
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw createError(401, "Invalid username or password");
  }

  // Compare the provided password with the hashed password in DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  // Generate JWT token with userId and username in payload
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};

export default auth_login;

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// import login from "../services/authService.js";

// register function to handle user registration
const register = async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res.status(400).json({ message: "Username already taken" });
  }

  // Validate password length (for example, it must be at least 6 characters)
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 12);
  // Create the user in the database
  const user = await User.create({ username, password: hashedPassword });

  res.status(201).json({
    message: "User created successfully",
    user: { id: user.id, username: user.username },
  });
};

// Login an existing user
const login = async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ where: { username } });

  // If no user found or password doesn't match
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create a JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};

export default { register, login };

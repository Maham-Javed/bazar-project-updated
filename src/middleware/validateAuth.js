const validateAuth = (req, res, next) => {
  const { username, password } = req.body;

  // Check if username and password exist and are non-empty
  if (!username || username.trim() === "") {
    return res.status(400).json({ message: "Username is required." });
  }
  if (!password || password.trim() === "") {
    return res.status(400).json({ message: "Password is required." });
  }

  // Password validation (example: minimum 6 characters)
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long." });
  }

  // Optionally: Add more validations for username (e.g., alphanumeric)
  const usernameRegex = /^[a-zA-Z0-9_]+$/; // Alphanumeric + underscores only
  if (!usernameRegex.test(username)) {
    return res
      .status(400)
      .json({
        message: "Username can only contain letters, numbers, and underscores.",
      });
  }

  next();
};

export default validateAuth;

import express from "express";
import authController from "../controllers/authController.js";
import validateAuth from "../middleware/validateAuth.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { limiter } from "../middleware/rateLimiter.js"; // Rate limiter middleware

const router = express.Router();

// Register route with validation and rate-limiting (optional)
router.post("/register", validateAuth, asyncHandler(authController.register));

// Login route with validation, rate-limiting, and async error handling
router.post(
  "/login",
  validateAuth,
  limiter,
  asyncHandler(authController.login)
);

export default router;

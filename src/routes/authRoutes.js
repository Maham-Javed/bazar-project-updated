import express from "express";
import authController from "../controllers/authController.js";
import validateAuth from "../middleware/validateAuth.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/register", validateAuth, asyncHandler(authController.register));
router.post("/login", validateAuth, asyncHandler(authController.login));

export default router;

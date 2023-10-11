import express from "express";
import {
  createUserProfile,
  getUserProfile,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:id", authMiddleware, getUserProfile);

// Create user profile by ID
router.post("/:id", authMiddleware, createUserProfile);

export default router;

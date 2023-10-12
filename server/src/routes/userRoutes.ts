import express from "express";
import {
  updateUserProfile,
  getUserProfile,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:id", authMiddleware, getUserProfile);

// Create user profile by ID
router.put("/:id", authMiddleware, updateUserProfile);

export default router;

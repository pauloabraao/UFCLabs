import express from "express";
const router = express.Router();
import {
  getAllComputerIssues,
  createComputerIssue,
  getComputerIssueById,
  updateComputerIssue,
  deleteComputerIssue,
} from "../controllers/computerIssueController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

// Public routes
router.get("/", getAllComputerIssues);
router.get("/:id", getComputerIssueById);

// Protected routes - require authentication
router.post("/", verifyToken, createComputerIssue);
router.put("/:id", verifyToken, updateComputerIssue);
router.delete("/:id", verifyToken, deleteComputerIssue);

export default router;

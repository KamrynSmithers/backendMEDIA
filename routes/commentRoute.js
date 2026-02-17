import express from "express";
import { createComment, getCommentsByPost, deleteComment } from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js"; // JWT auth

const router = express.Router();

router.post("/", createComment);
router.get("/:postId", getCommentsByPost);
router.delete("/:id", deleteComment);

export default router;

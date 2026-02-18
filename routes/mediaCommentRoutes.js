import express from "express";
import { 
  createMediaComment, 
  getMediaCommentsByContent, 
  updateMediaComment, 
  deleteMediaComment 
} from "../controllers/mediaCommentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createMediaComment);
router.get("/:contentType/:contentTitle", getMediaCommentsByContent);
router.put("/:id", protect, updateMediaComment);
router.delete("/:id", protect, deleteMediaComment);

export default router;
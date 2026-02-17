import express from "express";
import { createPost, getAllPosts, getPostById } from "../controllers/postController.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);

export default router;
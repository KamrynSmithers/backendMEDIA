import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const userId = req.user.id; // assuming JWT auth adds req.user

    if (!text || !postId) {
      return res.status(400).json({ message: "Text and Post ID required" });
    }

    const comment = new Comment({ text, post: postId, user: userId });
    const savedComment = await comment.save();

    // Optional: link comment to post
    await Post.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } });

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments for a post
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.user.toString() !== userId) return res.status(403).json({ message: "Not authorized" });

    await comment.remove();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

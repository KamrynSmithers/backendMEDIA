import MediaComment from "../models/MediaComment.js";

// Create comment
export const createMediaComment = async (req, res) => {
  try {
    const { contentTitle, contentType, text, rating } = req.body;
    const userId = req.user.id;

    if (!contentTitle || !contentType || !text) {
      return res.status(400).json({ message: "Content title, type, and text required" });
    }

    const comment = new MediaComment({
      contentTitle,
      contentType,
      user: userId,
      text,
      rating: rating || null
    });

    const savedComment = await comment.save();
    const populatedComment = await MediaComment.findById(savedComment._id).populate("user", "username");

    res.status(201).json(populatedComment);
  } catch (error) {
    console.log('Create media comment error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get comments for content
export const getMediaCommentsByContent = async (req, res) => {
  try {
    const { contentTitle, contentType } = req.params;
    const comments = await MediaComment.find({ 
      contentTitle: decodeURIComponent(contentTitle),
      contentType 
    })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.log('Get media comments error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update comment
export const updateMediaComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, rating } = req.body;
    const userId = req.user.id;

    const comment = await MediaComment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    
    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.text = text || comment.text;
    comment.rating = rating !== undefined ? rating : comment.rating;
    await comment.save();

    const updatedComment = await MediaComment.findById(id).populate("user", "username");
    res.json(updatedComment);
  } catch (error) {
    console.log('Update media comment error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete comment
export const deleteMediaComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await MediaComment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    
    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await MediaComment.findByIdAndDelete(id);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    console.log('Delete media comment error:', error.message);
    res.status(500).json({ message: error.message });
  }
};
import MediaComment from "../models/MediaComment.js";

export const createMediaComment = async (req, res) => {
    try {
    const { contentTitle, contentType, text, rating } = req.body;
    const userId = req.user.id;

    if (!contentTitle || !contentType || !text) {
      return res.status(400).json({ message: "Content title, type, and text required" });
    }
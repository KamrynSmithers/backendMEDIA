import mongoose from "mongoose";
const mediaCommentSchema = new mongoose.Schema ({
    contentTitle: { type: String, required: true },
    contentType: { type: String, enum: ['movie', 'book', 'music'], required: true },
    
})
import mongoose from "mongoose";
const mediaCommentSchema = new mongoose.Schema ({
    contentTitle: { type: String, required: true },
    contentType: { type: String, enum: ['movie', 'book', 'music'], required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    }, { timestamps: true });

    mediaCommentSchema.index({ contentTitle: 1, contentType: 1 });
    export default mongoose.model("MediaComment", mediaCommentSchema);

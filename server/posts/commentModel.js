import mongoose from "mongoose";

const comment = new mongoose.Schema({
  onPostId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Post",
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  reply: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Comment", comment);

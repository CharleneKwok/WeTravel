import mongoose from "mongoose";

const reply = new mongoose.Schema({
  onCommentId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Comment",
  },
  replyToId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  replyFromId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Reply", reply);

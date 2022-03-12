import mongoose from "mongoose";

const post = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: [String],
  likes: {
    type: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleString("en-US", {
      timeZone: "Australia/Sydney",
      hour12: false,
    }),
  },
});

export default mongoose.model("Post", post);

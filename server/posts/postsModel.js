import mongoose from "mongoose";

const posts = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  posts: {
    type: [
      {
        content: {
          type: String,
          required: true,
        },
        images: [String],
        likes: {
          type: Number,
          default: 0,
        },
        reviews: [],
      },
    ],
    default: [],
  },
});

export default mongoose.model("Posts", posts);

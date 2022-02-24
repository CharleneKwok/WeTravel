import mongoose from "mongoose";

const review = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  content: String,
  reply: [{}],
});

export default mongoose.model("Review", review);

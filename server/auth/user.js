import mongoose from "mongoose";

const user = new mongoose.Schema({
  uId: Number,
  google: Boolean,
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    default: "",
  },
  avatar: String,
  token: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  // posts: []
});

export default mongoose.model("User", user);

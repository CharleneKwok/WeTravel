import mongoose from "mongoose";

const user = new mongoose.Schema({
  google: Boolean,
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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
  bio: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("User", user);

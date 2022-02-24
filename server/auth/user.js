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
  bio: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  mapAppearance: {
    type: String,
    default: "basic",
  },
  wholeAppearance: {
    type: String,
    default: "light",
  },
});

export default mongoose.model("User", user);

import mongoose from "mongoose";

const user = new mongoose.Schema({
  uId: Number,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  token: String,
  // createdAt: {
  //   type: Date,
  //   default: new Date(),
  // },
  // posts: []
});

export default mongoose.model("User", user);

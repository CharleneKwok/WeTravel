import mongoose from "mongoose";

const pwdToken = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: new Date(),
    expires: 3600, // one hour
  },
});

export default mongoose.model("PwdToken", pwdToken);

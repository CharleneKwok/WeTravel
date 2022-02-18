import mongoose from "mongoose";

const saveList = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  saveList: [
    {
      location_id: {
        type: Number,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      tripAdvisor: String,
      website: String,
      image: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

export default mongoose.model("SaveList", saveList);

import mongoose from "mongoose";

const hotel = new mongoose.Schema({
  location_id: {
    type: String,
    required: true,
  },
});

import mongoose from "mongoose";

const numberSchema = new mongoose.Schema({
  letter: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const Number = mongoose.model("Number", numberSchema);

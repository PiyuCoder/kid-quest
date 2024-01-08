import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  dp: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  completedQuizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  correctQuizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  incorrectQuizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  alphabetProgress: {
    type: Number,
    default: 0,
  },
  numProgress: {
    type: Number,
    default: 0,
  },
  alphabetAttempted: {
    type: Number,
    default: 0,
  },
  animalAttempted: {
    type: Number,
    default: 0,
  },
  numberAttempted: {
    type: Number,
    default: 0,
  },
  colorAttempted: {
    type: Number,
    default: 0,
  },
  colorProgress: {
    type: Number,
    default: 0,
  },
  animalProgress: {
    type: Number,
    default: 0,
  },
  quizProgress: {
    type: Number,
    default: 0,
  },
  alphabetIndex: {
    type: Number,
    default: 0,
  },
  animalIndex: {
    type: Number,
    default: 0,
  },
  numberIndex: {
    type: Number,
    default: 0,
  },
  colorIndex: {
    type: Number,
    default: 0,
  },
});

export const User = new mongoose.model("User", userSchema);

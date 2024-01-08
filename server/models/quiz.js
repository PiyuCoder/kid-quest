import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  question: { type: String, required: true },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  answer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isCorrect: {
    type: String,
    default: "Not attempted",
  },
  answered: {
    type: String,
    default: "Not answered yet",
  },
});

export const Quiz = new mongoose.model("Quiz", quizSchema);

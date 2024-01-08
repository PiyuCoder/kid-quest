import { User } from "../models/User.models.js";
import { Quiz } from "../models/quiz.js";

export const resetSectionController = async (req, res) => {
  try {
    const { category } = req.body;
    const userId = req.user.id;

    const quizzes = await Quiz.find({ category }, { _id: 1 });
    const user = await User.findById(userId);

    const resetQuizzes = [];
    const resetCorrectQuizzes = [];
    const resetIncorrectQuizzes = [];

    for (const quiz of quizzes) {
      if (user.completedQuizzes.includes(quiz._id)) {
        // console.log("it includes");
        quiz.isCompleted = false;
        quiz.isCorrect = "Not attempted";
        quiz.answered = "Not answered yet";
        resetQuizzes.push(quiz._id);
        await quiz.save();
      }
      if (user.correctQuizzes.includes(quiz._id)) {
        resetCorrectQuizzes.push(quiz._id);
      }
      if (user.incorrectQuizzes.includes(quiz._id)) {
        resetIncorrectQuizzes.push(quiz._id);
      }
    }

    const result = await User.updateOne(
      { _id: userId },
      {
        $pull: {
          completedQuizzes: { $in: resetQuizzes },
          correctQuizzes: { $in: resetCorrectQuizzes },
          incorrectQuizzes: { $in: resetIncorrectQuizzes },
        },
        $set: {
          [category + "Progress"]: 0,
          [category + "Attempted"]: 0,
          [category + "Index"]: 0,
        },
      }
    );

    // user.completedQuizzes = [];

    console.log("Updated User:", result);
    await user.save();

    return res
      .status(200)
      .send({ success: true, message: "Section reset successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

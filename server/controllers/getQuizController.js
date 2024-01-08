import { User } from "../models/User.models.js";
import { Quiz } from "../models/quiz.js";

export const getQuizController = async (req, res) => {
  try {
    const { category } = req.query;

    const quiz = await Quiz.find({ category });

    return res.status(200).send({
      success: true,
      message: `Fetched all quiz of category: ${category}`,
      quiz,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: "server error" });
  }
};

export const getUserQuizController = async (req, res) => {
  try {
    const { category } = req.query;
    const userId = req.user.id;

    const user = await User.findOne({ _id: userId });

    // Fetch details for all correct quizzes
    const quizzesDetails = await Promise.all(
      user.correctQuizzes.map(async (quizId) => {
        try {
          const quiz = await Quiz.findOne({ _id: quizId });
          return quiz;
        } catch (error) {
          // Handle errors for individual quiz fetching
          console.error(`Error fetching quiz ${quizId}:`, error);
          return null;
        }
      })
    );

    // Fetch details for all incorrect quizzes
    const incorrectQuizzesDetails = await Promise.all(
      user.incorrectQuizzes.map(async (quizId) => {
        try {
          const quiz = await Quiz.findOne({ _id: quizId });
          return quiz;
        } catch (error) {
          // Handle errors for individual quiz fetching
          console.error(`Error fetching quiz ${quizId}:`, error);
          return null;
        }
      })
    );

    // Filter quizzes based on category
    const quizzes = quizzesDetails.filter(
      (quiz) => quiz && quiz.category === category
    );

    // Filter quizzes based on category
    const incorrectQuizzes = incorrectQuizzesDetails.filter(
      (quiz) => quiz && quiz.category === category
    );

    return res.status(200).send({
      success: true,
      message: `Fetched all quizzes of category: ${category}`,
      quizzes,
      incorrectQuizzes,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

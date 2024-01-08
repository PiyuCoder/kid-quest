import { User } from "../models/User.models.js";
import { Quiz } from "../models/quiz.js";

export const submitAnswerController = async (req, res) => {
  try {
    const { answer, qId } = req.body;
    const userId = req.user.id;

    const quiz = await Quiz.findOne({ _id: qId });
    const user = await User.findOne({ _id: userId });

    let category = await quiz.category;
    // quiz.isCompleted = true;
    // quiz.answered = answer;

    // console.log(category);

    if (quiz.answer === answer) {
      // If the answer is correct
      if (!user.correctQuizzes.includes(qId)) {
        await user.correctQuizzes.push(qId);

        // Remove from incorrect quizzes if it exists
        const indexOfIncorrect = user.incorrectQuizzes.indexOf(qId);
        if (indexOfIncorrect !== -1) {
          user.incorrectQuizzes.splice(indexOfIncorrect, 1);
        }
      }
    } else {
      // If the answer is incorrect
      if (!user.incorrectQuizzes.includes(qId)) {
        await user.incorrectQuizzes.push(qId);

        // Remove from correct quizzes if it exists
        const indexOfCorrect = user.correctQuizzes.indexOf(qId);
        if (indexOfCorrect !== -1) {
          user.correctQuizzes.splice(indexOfCorrect, 1);
        }
      }
    }

    if (!user.completedQuizzes.includes(qId)) {
      await user.completedQuizzes.push(qId);

      if (quiz.answer === answer) {
        user[category + "Progress"] += 1;
        user[category + "Attempted"] += 1;
        // quiz.isCorrect = "correct";
      } else {
        user[category + "Attempted"] += 1;
        // quiz.isCorrect = "incorrect";
      }
    }

    await quiz.save();
    // Save the updated user to the database
    await user.save();

    return res
      .status(200)
      .send({ success: true, message: "Answer Submitted successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

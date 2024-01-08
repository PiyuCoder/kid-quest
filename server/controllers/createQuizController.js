import { Quiz } from "../models/quiz.js";

export const createQuizController = async (req, res) => {
  try {
    const { title, category, question, answer, options } = req.body;

    if (!title || !category || !question || !answer || !options)
      return res
        .status(400)
        .send({ success: false, message: "All fields requiredr" });

    const newQuiz = await new Quiz({
      title,
      category,
      question,
      answer,
    });

    await newQuiz.options.push(...options);

    await newQuiz.save();

    return res
      .status(200)
      .send({ success: true, message: "Quiz created successfully!", newQuiz });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

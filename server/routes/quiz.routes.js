import express from "express";
import { createQuizController } from "../controllers/createQuizController.js";
import {
  getQuizController,
  getUserQuizController,
} from "../controllers/getQuizController.js";
import { submitAnswerController } from "../controllers/submitAnswerController.js";
import { authenticator } from "../middleware/authenticator.js";

const router = express.Router();

router.post("/createQuiz", createQuizController);
router.post("/submitAnswer", authenticator, submitAnswerController);

router.get("/getQuiz", getQuizController);
router.get("/getUserQuiz", authenticator, getUserQuizController);

export default router;

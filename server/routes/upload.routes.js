import express from "express";
import {
  uploadAlphImgController,
  uploadAnimalImgController,
} from "../controllers/uploadAlphImgController.js";
import {
  uploadAlphMiddleware,
  uploadAnimalMiddleware,
} from "../multer/multer.js";

const router = express.Router();

router.post(
  "/uploadAlphImg",
  uploadAlphMiddleware.single("file"),
  uploadAlphImgController
);

router.post(
  "/uploadAnimalImg",
  uploadAnimalMiddleware.single("file"),
  uploadAnimalImgController
);

export default router;

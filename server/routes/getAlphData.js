import express from "express";
import { getAlphImgController } from "../controllers/getAlphImgController.js";

const router = express.Router();

router.get("/getAlphImg", getAlphImgController);

export default router;

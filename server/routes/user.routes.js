import express from "express";
import { registerController } from "../controllers/registerController.js";
import { loginController } from "../controllers/loginController.js";
import { authenticator } from "../middleware/authenticator.js";
import { getUserDataController } from "../controllers/getUserDataController.js";
import { updateProgressIndex } from "../controllers/updateProgressIndex.js";
import { resetSectionController } from "../controllers/resetSectionController.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/user", authenticator, getUserDataController);

//update the index of progress to track the last studied page
router.post("/updateIndex", authenticator, updateProgressIndex);
router.post("/reset", authenticator, resetSectionController);

export default router;

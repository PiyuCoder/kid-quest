import { Alphabet } from "../models/alphabets.models.js";
import alphabetArray from "./alphabetApi.js";
import express from "express";

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// // Handle image upload
// router.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     const newImage = new Alphabet({
//       letter: req.body.letter,
//       image: {
//         data: req.file.buffer,
//         contentType: req.file.mimetype,
//       },
//     });

//     await newImage.save();
//     res.status(201).send("Image uploaded successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

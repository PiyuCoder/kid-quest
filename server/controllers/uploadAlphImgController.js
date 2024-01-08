import { Alphabet, Animal } from "../models/alphabets.models.js";

export const uploadAlphImgController = async (req, res) => {
  try {
    const { filename } = req.file;
    const { letter } = req.body;

    const newUpload = await new Alphabet({ letter, image: filename }).save();
    return res.status(201).send({
      success: true,
      message: "uploaded image and letter successfully",
      newUpload,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

export const uploadAnimalImgController = async (req, res) => {
  try {
    const { filename } = req.file;
    const { letter } = req.body;

    const newUpload = await new Animal({ letter, image: filename }).save();
    return res.status(201).send({
      success: true,
      message: "uploaded image and letter successfully",
      newUpload,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

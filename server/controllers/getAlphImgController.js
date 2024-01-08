import { Alphabet } from "../models/alphabets.models.js";

export const getAlphImgController = async (req, res) => {
  try {
    const alphData = await Alphabet.find();

    return res
      .status(200)
      .send({
        success: true,
        message: "Feteched Alphabets and Images successfully.",
        alphData,
      });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

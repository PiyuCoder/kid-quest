import { User } from "../models/User.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginController = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!password || !phone) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are mandatory" });
    }

    const existing = await User.findOne({ phone });

    if (!existing) {
      return res
        .status(400)
        .send({ success: false, message: "User doesn't exist" });
    }

    // Use 'await' to properly handle the Promise returned by bcrypt.compare
    const verified = await bcrypt.compare(password, existing.password);

    if (!verified) {
      return res
        .status(400)
        .send({ success: false, message: "Incorrect credentials" });
    }

    const token = jwt.sign({ id: existing._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .send({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

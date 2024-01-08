import { User } from "../models/User.models.js";
import bcrypt from "bcryptjs";

export const registerController = async (req, res) => {
  try {
    const { name, age, phone, password } = req.body.formData;

    console.log(name, age, phone, password);

    if (!name || !age || !phone || !password) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are mandatory" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      age,
      phone,
      password: hashedPassword,
    }).save();

    return res
      .status(201)
      .send({ success: true, message: "User created successfully", newUser });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Server error, Try again" });
  }
};

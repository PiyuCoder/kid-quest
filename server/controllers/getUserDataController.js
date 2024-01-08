import { User } from "../models/User.models.js";

export const getUserDataController = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log(userId);

    const user = await User.findOne({ _id: userId });

    if (!user)
      return res
        .status(300)
        .send({ success: false, message: "User doesn't exist" });

    return res
      .status(200)
      .send({ success: true, message: "User data fetched!", user });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

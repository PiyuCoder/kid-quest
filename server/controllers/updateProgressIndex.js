import { User } from "../models/User.models.js";

export const updateProgressIndex = async (req, res) => {
  try {
    const { category, currentIndex } = req.body;
    const userId = req.user.id;

    const user = await User.findOne({ _id: userId });

    // console.log(category);
    user[category + "Index"] = currentIndex;

    // Save the updated user to the database
    await user.save();

    return res.status(200).send({
      success: true,
      message: "Updatex the progress Index successfully",
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

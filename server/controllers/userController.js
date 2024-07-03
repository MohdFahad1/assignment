const { hashPassword } = require("../helpers/authHelper");
const User = require("../models/userModel");

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, password: hashedPassword, role },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, user: updateUser, message: "User Updated" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error fetching User Details: ", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).send({
        success: false,
        error: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already in use",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).send({
      success: true,
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error Adding User: ", error);
    return res.status(500).send({
      success: false,
      message: "Error adding user",
      error: error.message,
    });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUsers,
  getSingleUser,
  addUser,
};

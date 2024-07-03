const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const JWT = require("jsonwebtoken");

// REGISTER USER
const registerController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) {
      return res.send({
        error: "First Name is Required",
      });
    }
    if (!lastName) {
      return res.send({
        error: "Last Name is Required",
      });
    }
    if (!email) {
      return res.send({
        error: "Email is Required",
      });
    }
    if (!password) {
      return res.send({
        error: "Password is Required",
      });
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already in use",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    user.save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully, Please Login",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error Registering User",
      error,
    });
  }
};

// LOGIN USER
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).end({
        error: "Invalid email or password",
      });
    }

    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

const testController = async (req, res) => {
  try {
    res.send("Protected Route");
  } catch (error) {
    console.log("Error: ", error);
    res.send({
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  testController,
};

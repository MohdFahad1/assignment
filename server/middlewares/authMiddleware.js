const JWT = require("jsonwebtoken");
const User = require("../models/userModel");

const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token not provided",
      });
    }
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log("Error in Require Sign In: ", error);
    res.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }
};

//admin access
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user?.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("Error in Admin: ", error);
    return res.status(401).send({
      success: false,
      error,
      message: "Error in Admin middelware",
    });
  }
};

module.exports = {
  requireSignIn,
  isAdmin,
};

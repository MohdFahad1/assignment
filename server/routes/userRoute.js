const express = require("express");
const {
  updateUser,
  deleteUser,
  getUsers,
  getSingleUser,
  addUser,
} = require("../controllers/userController");

const router = express.Router();

// UPDATE USER
router.put("/:userId", updateUser);

// DELETE USER
router.delete("/:userId", deleteUser);

// GET ALL USERS
router.get("/", getUsers);

// GET USER DETAILS
router.get("/:userId", getSingleUser);

// ADD USER
router.post("/", addUser);

module.exports = router;

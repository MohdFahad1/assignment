const express = require("express");

const router = express.Router();

const {
  registerController,
  loginController,
  testController,
} = require("../controllers/authController");

const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

//routing

//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN / METHOD POST
router.post("/login", loginController);

//test
router.get("/test", requireSignIn, testController);

// protected route admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;

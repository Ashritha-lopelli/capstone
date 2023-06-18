const express = require("express");
const UserController = require("../controllers/userController");
const { checkDuplicateEmail } = require("../middlewares/verifySignUp");

const router = express.Router();

router.post("/register", checkDuplicateEmail, UserController.register);

router.post("/login", UserController.signin);

router.post("/logout", UserController.signout);

module.exports = router;

const config = require("../config");
const User = require("../models/User");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    await user.save();

    res.send({ status: 'Success', message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ status: "Fail", message: err });
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;

    res.status(200).send({
      token,
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Fail", message: err });
  }
};

const signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

module.exports = {
  register,
  signin,
  signout,
};

const User = require("../models/User");

const checkDuplicateEmail = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).send({ message: "Invalid data" });
      return;
    }

    const user = await User.findOne({
      email,
    });

    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
};

module.exports = {
  checkDuplicateEmail,
};

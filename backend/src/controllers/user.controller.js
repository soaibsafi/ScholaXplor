const User = require("../model/user.model");
const validator = require("validator");
const bcrypt = require("bcryptjs");

exports.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username: username });

  if (!user) {
    throw new Error("Unable to login!");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to Login");
  }

  return user;
};

exports.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.uid.toString() }, "newsecret");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};





exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

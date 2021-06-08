const User = require("../model/user.model");
const validator = require("validator");
const bcrypt = require("bcryptjs");

//Create a user
exports.createUser = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(200).send({
      message: "Content can not be empty!",
      status: "FAILED",
      statusCode: "400"
    });
  }

  const newUser = new User({
    uid: req.body.uid,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role
  });

  // Save User in the database
  User.create(newUser, (err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while creating the User.",
        status: "FAILED",
        statusCode: "500"
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


exports.findUserByRole = (req, res) => {
  User.getAllByRole(req.params.role, (err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving users.",
        status: "FAILED",
        statusCode: "500"
      });
    else res.send(data);
  });
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


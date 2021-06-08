const Class = require("../model/class.model");

exports.createClass = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const class_c = new Class({
      cid : req.body.cid,
      classname: req.body.classname
    });
  
    // Save Customer in the database
    Class.create(class_c, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Class."
        });
      else res.send(data);
    });
  };


exports.updateById = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Class.updateOne(req.params.classId, new Class(req.body), (err, data) => {
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


exports.deleteClassById = (req, res) => {
    Class.remove(req.params.classId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Class with id ${req.params.classId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Class with id " + req.params.customerId
          });
        }
      } else res.send({ message: `Class was deleted successfully!` });
    });
  };
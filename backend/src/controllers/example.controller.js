const Class = require("../model/example.model");

exports.findAll = (req, res) => {
  Class.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

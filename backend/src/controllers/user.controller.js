const User = require("../model/user.model");

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
    User.findById((err, data)=>{
        if(err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving customers."
            })
        else
            res.send(data)
    })
}
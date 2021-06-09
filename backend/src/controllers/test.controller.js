const Test = require("../model/test.model");


exports.getMarksByTestId = (req, res) => {
  Test.getAllMarks(req.params.testId, (err, data) => {
    if (err)
      res.status(200).send({
        status: "FAILED",
        statusCode: 500,
        message: err.message || "Some error occurred while retrieving Marks.",
      });
    else res.status(200).send({
        status: "SUCCESS",
        statusCode: 200,
        data:data
    });
  });
};

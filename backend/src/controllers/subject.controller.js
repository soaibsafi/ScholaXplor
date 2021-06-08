const Subject = require("../model/subject.model");
//const subjectRoutes = require("../routes/subject.routes");

exports.getAllSubjectByClass = (req, res) => {
  Subject.getAll(req.params.classId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Subjects.",
      });
    else res.send(data);
  });
};

exports.updateSubjectById = (req, res) => {
  Subject.update(req.params.subjectId, new Subject(req.body), (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Subjects.",
      });
    else res.send(data);
  });
};

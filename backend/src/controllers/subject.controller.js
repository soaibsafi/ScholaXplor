const Subject = require("../model/subject.model");


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

exports.getAllGradeBySubjectPupilId = (req, res) => {
  //console.log(req.query.sid, req.query.pid)
  Subject.getAllTestGrades(req.query.sid, req.query.pid, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Subjects.",
      });
    else res.send(data);
  });
};

exports.getAllSubjectByPupilId = (req, res) => {
  Subject.getAllSUbjectOfPupil(req.params.pupilId, (err, data) => {
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

exports.deleteSubjectById = (req, res) => {
  Subject.deleteOne(req.params.subjectId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Subjects.",
      });
    else res.send(data);
  });
};


exports.createSubject = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Subject
      const subject = new Subject({
        sid : req.body.sid,
        subjectname: req.body.subjectname,
        status: req.body.status,
        uid: req.body.uid,
        cid: req.body.cid
      });
    
      // Save Customer in the database
      Subject.create(subject, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Class."
          });
        else res.send(data);
      });
  };

  exports.getAverageGradeBySubjectId = (req, res) => {
    Subject.getAverageGrade(req.params.subjectId, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Subjects.",
        });
      else res.send(data);
    });
  };

  exports.getAverageGradePupilSUbject = (req, res) => {
    Subject.getAverageGradeBySubAndPupil(req.query.sid, req.query.pid, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Subjects.",
        });
      else res.send(data);
    });
  };
const userMiddleware = require("../middleware/authjwt");

module.exports = (app) => {
  const subject = require("../controllers/subject.controller");

  app.get("/subjects/:classId", subject.getAllSubjectByClass);
  app.put("/subject/:subjectId", subject.updateSubjectById);
  app.delete("/subject/:subjectId", subject.deleteSubjectById);
  app.post("/subject/", subject.createSubject);
  app.get("/subject-average/:subjectId", subject.getAverageGradeBySubjectId);
  app.get('/pupil-subjects/:pupilId', subject.getAllSubjectByPupilId)
  app.get('/pupil-average/', subject.getAverageGradePupilSUbject)
  app.get('/test-grades/', subject.getAllGradeBySubjectPupilId)
};

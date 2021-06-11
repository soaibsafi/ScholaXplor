const userMiddleware = require("../middleware/authjwt");

module.exports = (app) => {
  const subject = require("../controllers/subject.controller");

  app.get("/subjects/:classId", userMiddleware.isAdminLoggedIn,  subject.getAllSubjectByClass);
  app.get("/subject-average/:subjectId", userMiddleware.isTeacherLoggedIn,  subject.getAverageGradeBySubjectId);
  app.get('/pupil-subjects/:pupilId', userMiddleware.isTeacherLoggedIn, subject.getAllSubjectByPupilId)
  app.get('/pupil-average/', subject.getAverageGradePupilSUbject)
  app.get('/test-grades/', subject.getAllGradeBySubjectPupilId)
  app.put("/subject/:subjectId", subject.updateSubjectById);
  app.delete("/subject/:subjectId", subject.deleteSubjectById);
  app.post("/subject/", subject.createSubject);
};

const userMiddleware = require("../middleware/authjwt");

module.exports = (app) => {
  const subject = require("../controllers/subject.controller");

  app.get("/subjects/:classId", subject.getAllSubjectByClass);
  app.put("/subject/:subjectId", subject.updateSubjectById);
  app.delete("/subject/:subjectId", subject.deleteSubjectById);
  app.post("/subject/", subject.createSubject);
  app.get("/averageGrade/:subjectId", subject.getAverageGradeBySubjectId);
};

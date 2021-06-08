const userMiddleware = require("../middleware/authjwt");

module.exports = app => {
    const subject = require("../controllers/subject.controller");

    app.get('/subjects/:classId', subject.getAllSubjectByClass)
    app.put('/subject/:subjectId', subject.updateSubjectById)

  };
  


const userMiddleware = require("../middleware/authjwt");

module.exports = app => {
    const test = require("../controllers/test.controller");

    app.get('/test/:sid', test.getAllTestsBySid)
    app.put('/test/:tid', test.updateTestByTid)
    app.delete('/test/:tid', test.deleteTestByTid)
    app.post('/test/', test.createTest)
    app.get("/marks/:testId", test.getMarksByTestId);
  };
  
  
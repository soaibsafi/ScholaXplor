const userMiddleware = require("../middleware/authjwt");

module.exports = app => {
    const test = require("../controllers/test.controller");

    app.get('/marks/:testId', test.getMarksByTestId)


  };
  
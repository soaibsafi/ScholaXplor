const userMiddleware = require("../middleware/authjwt");

module.exports = app => {
    const classPupil = require("../controllers/class.pupil.controller");

    app.post('/assign-pupil/', classPupil.assignNewPupil)
    app.put('/assign-pupil/:uid', classPupil.assignUpdatePupil)

  };
  

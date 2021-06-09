const userMiddleware = require("../middleware/authjwt");

module.exports = app => {
    const class_c = require("../controllers/class.controller");

    app.post('/class/', class_c.createClass)

    app.put('/class/:classId', class_c.updateById)

    app.delete('/class/:classId', class_c.deleteClassById)

    app.get('/class/', class_c.getAllClass)

  };
  

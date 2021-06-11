const userMiddleware = require("../middleware/authjwt");

module.exports = app => {
    const class_c = require("../controllers/class.controller");

    app.post('/class/', userMiddleware.isAdminLoggedIn, class_c.createClass)

    app.put('/class/:classId', userMiddleware.isAdminLoggedIn, class_c.updateById)

    app.delete('/class/:classId', userMiddleware.isAdminLoggedIn, class_c.deleteClassById)

    app.get('/class/', class_c.getAllClass)

  };
  

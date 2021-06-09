const userMiddleware = require("../middleware/authjwt");

module.exports = app => {

    const user = require("../controllers/user.controller.js");

    app.post("/user/", userMiddleware.isAdminLoggedIn, user.createUser);
    
    app.get("/user/getUserByRole/:role", userMiddleware.isAdminLoggedIn, user.findUserByRole);
    
    app.get("/users", userMiddleware.isAdminLoggedIn, user.findAll);

    app.put("/user/:uid", userMiddleware.isAdminLoggedIn, user.update);

    app.delete("/user/:uid", userMiddleware.isAdminLoggedIn, user.delete);

    app.get('/user/:userId', user.findOne);
  
  };
  
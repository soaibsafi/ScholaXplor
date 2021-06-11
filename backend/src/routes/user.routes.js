const userMiddleware = require("../middleware/authjwt");

module.exports = app => {
    const user = require("../controllers/user.controller.js");

    app.post("/createUser", userMiddleware.isAdminLoggedIn, user.createUser);
    app.get("/getUserByRole/:role", userMiddleware.isAdminLoggedIn, user.findUserByRole);
    app.get("/users", userMiddleware.isAdminLoggedIn, user.findAll);
    
    app.get('/user/:userId', userMiddleware.isAdminLoggedIn, user.findOne)
  };
  
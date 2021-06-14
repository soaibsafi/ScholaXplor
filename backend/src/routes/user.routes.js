const userMiddleware = require("../middleware/authjwt");

module.exports = app => {
    const user = require("../controllers/user.controller.js");


    app.get('/user/:userId', userMiddleware.isAdminLoggedIn, user.findOne)
    app.get("/user/getUserByRole/:role", userMiddleware.isAdminLoggedIn, user.findUserByRole);
    app.get('/usercheck/:username', userMiddleware.isAdminLoggedIn, user.checkDuplicateUsername);
    app.get("/users", userMiddleware.isAdminLoggedIn, user.findAll);
    app.get('/search-pupil/:sParam', user.searchAllPupil)

    app.post("/user/", userMiddleware.isAdminLoggedIn, user.createUser);
    app.put("/user/:uid", userMiddleware.isAdminLoggedIn, user.update);
    app.delete("/user/:uid", user.delete);

    // app.get('/user/:userId', user.findOne);
  };

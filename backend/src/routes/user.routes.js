const userMiddleware = require("../middleware/authjwt");

module.exports = app => {
    const user = require("../controllers/user.controller.js");

    app.post("/createUser", userMiddleware.isAdminLoggedIn, user.createUser);
    app.get("/getUserByRole/:role", userMiddleware.isAdminLoggedIn, user.findUserByRole);
    app.get("/users", userMiddleware.isAdminLoggedIn, user.findAll);
    
    app.get('/user/:userId', user.findOne)
  
    // Retrieve a single Customer with customerId
    // app.get("/customers/:customerId", customers.findOne);
  
    // Update a Customer with customerId
    // app.put("/customers/:customerId", customers.update);
  
    // Delete a Customer with customerId
    // app.delete("/customers/:customerId", customers.delete);
  
    // Create a new Customer
    // app.delete("/customers", customers.deleteAll);
  };
  
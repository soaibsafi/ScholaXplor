
module.exports = app => {
    const user = require("../controllers/user.controller.js");
    //console.log(classm);
  
    // Create a new Customer
    // app.post("/customers", customers.create);
  
    // Retrieve all Customers
    app.get("/users", user.findAll);
    
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
  
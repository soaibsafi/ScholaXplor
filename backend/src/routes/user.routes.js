
module.exports = app => {
    const user = require("../controllers/user.controller.js");

    app.get("/users", user.findAll);
    
    app.get('/user/:userId', user.findOne)

    app.post('/users/login', async (req, res) => {
      console.log(req.body)
      try {
          const user = await User.findByCredentials(req.body.username, req.body.password)
          console.log(user)
          const token = await user.generateAuthToken()
          res.send({ user, token })
  
      } catch (e) {
          res.status(400).send()
      }
  })
  
    // Retrieve a single Customer with customerId
    // app.get("/customers/:customerId", customers.findOne);
  
    // Update a Customer with customerId
    // app.put("/customers/:customerId", customers.update);
  
    // Delete a Customer with customerId
    // app.delete("/customers/:customerId", customers.delete);
  
    // Create a new Customer
    // app.delete("/customers", customers.deleteAll);
  };
  
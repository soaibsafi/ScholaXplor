const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var AuthController = require('./src/middleware/AuthController.js');
app.use('/api/auth', AuthController);



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

 require("./src/routes/example.routes")(app);
 require('./src/routes/user.routes')(app)
// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

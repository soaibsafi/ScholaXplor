const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());

// const router = require('./src/routes/auth.routes');
// app.use('/', router);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to School Management System" });
});

// Import All router
require("./src/routes/user.routes")(app);
require("./src/routes/auth.routes")(app);


// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

const sql = require("../model/db.js");

const User = function (user) {
  this.uid = user.uid;
  this.username = user.username;
  this.password = user.password;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
};

User.getAll = (result) => {
  sql.query("SELECT * FROM User", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("class: ", res);
    result(null, res);
  });
};

User.findById = (userId, result) => {
    //var query = "Select * from User where uid ='" +userId+ "'";
    sql.query("SELECT * FROM User WHERE uid ='" +userId+ "'", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

module.exports = User;

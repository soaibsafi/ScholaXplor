const sql = require("../model/db.js");

const Class = function(classm) {
  this.cid = classm.cid;
  this.classname = classm.classname;
};

Class.getAll = result => {
  console.log("In get all");
  sql.query("SELECT * FROM Class", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("class: ", res);
    result(null, res);
  });
};

module.exports = Class;


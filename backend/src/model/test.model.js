const sql = require("../model/db");

const Test = function (test) {
  this.tid = test.tid;
  this.testname = test.testname;
  this.testdate = test.testdate;
  this.sid = test.sid;
};

Test.getAllMarks = (testId, result) => {
  var query =
    "SELECT name, username, marks FROM result INNER JOIN (SELECT CONCAT(firstname, ' ', lastname) as name, username FROM User WHERE uid = (SELECT uid FROM Subject WHERE sid = (SELECT sid FROM Test WHERE tid = ?))) AS T";
  sql.query(query, testId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Data: ", res);
    result(null, res);
  });
};

module.exports = Test;

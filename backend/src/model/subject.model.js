const sql = require("../model/db");

const Subject = function (subject) {
  this.sid = subject.sid;
  this.subjectname = subject.subjectname;
  this.status = subject.status;
  this.uid = subject.uid;
  this.cid = subject.cid;
};

Subject.getAll = (cid, result) => {
  var query = "SELECT subjectname, status,(SELECT COUNT(ClassStudent.uid)FROM ClassStudent WHERE cid='"+cid+"') as totalstudent, (SELECT CONCAT(firstname, ' ',lastname) FROM User Where uid=(SELECT uid FROM Subject WHERE cid='"+cid+"')) as fullname FROM Subject WHERE cid='"+cid+"'"
  sql.query(
    query,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("class: ", res);
      result(null, res);
    }
  );
};

module.exports = Subject;

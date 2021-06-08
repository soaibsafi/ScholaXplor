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

Subject.update = (sid, subject, result) => {

  sql.query("SET FOREIGN_KEY_CHECKS=0;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
  });

  sql.query("UPDATE AssignedSubject SET uid=?", subject.uid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
  });

  sql.query(
    "UPDATE Subject SET subjectname = ?, status = ?, uid= ?, cid=? WHERE sid = ?",
    [subject.subjectname, subject.status, subject.uid, subject.cid, sid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      sql.query("SET FOREIGN_KEY_CHECKS=1;", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
      });

      console.log("Updated Subject: ", { ...subject  });
      result(null, { ...subject });
    }
  );
}

module.exports = Subject;

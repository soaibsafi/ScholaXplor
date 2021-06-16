const sql = require("../model/db");

const Subject = function (subject) {
  this.sid = subject.sid;
  this.subjectname = subject.subjectname;
  this.status = subject.status;
  this.uid = subject.uid;
  this.cid = subject.cid;
};

Subject.getAll = (cid, result) => {
  var query =
    "SELECT CONCAT(firstname, ' ',lastname) as fullname, T.subjectname, T.status, T.uid, T.sid FROM User INNER JOIN (SELECT subjectname, status, uid, Subject.sid FROM Subject INNER JOIN (SELECT Subject.sid FROM Subject WHERE Subject.cid = ?)  as TT ON Subject.sid = TT.sid) as T ON User.uid = T.uid";
  sql.query(query, cid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("class: ", res);
    result(null, res);
  });
};

Subject.getAllTestGrades = (sid, pid, result) => {
  console.log(sid, pid)
  var query =
    "SELECT Test.testname, Test.testdate, T.marks FROM Test INNER JOIN (SELECT result.marks, result.tid FROM result WHERE result.aid = (SELECT AssignedSubject.aid FROM AssignedSubject WHERE uid = ? AND sid = ?)) as T ON Test.tid = T.tid"
  sql.query(query, [pid, sid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("class: ", res);
    result(null, res);
  });
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

      //console.log("Updated Subject: ", { ...subject });
      result(null, { ...subject });
    }
  );
};

Subject.deleteOne = (sid, result) => {
  res_count = 0;
  sql.query(
    "SELECT COUNT(tid) as count FROM Test WHERE sid = ?",
    sid,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, res);
        return;
      }
      res_count = res[0].count;
      console.log("Count: ", res_count);
      //console.log(typeof(res))

      if (!res_count) {
        sql.query(
          "DELETE FROM AssignedSubject WHERE sid = ?",
          sid,
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
          }
        );
        sql.query("DELETE FROM Subject WHERE sid = ?", sid, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
        });
        result(null, res);
        return;
      }

      result(null, { msg: "Dependent Test. Can't Delete" });
    }
  );
};

Subject.create = (newSubject, result) => {
  sql.query("INSERT INTO Subject SET ?", newSubject, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created Class: ", { ...newSubject });
    result(null, { ...newSubject });
  });
};

Subject.getAverageGrade = (subjectId, result) => {
  var query =
    "SELECT CONCAT(User.firstname, ' ', User.lastname) as name , TT.AVG_MARK FROM User INNER JOIN (SELECT AssignedSubject.uid as userid, T.AVG_MARK FROM AssignedSubject INNER JOIN (SELECT aid, AVG(marks) as AVG_MARK FROM result INNER JOIN (SELECT tid FROM Test WHERE sid = ?) as T ON result.tid = T.tid GROUP BY result.aid) as T ON AssignedSubject.aid = T.aid) as TT ON User.uid = TT.userid";
  sql.query(query, subjectId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("class: ", res);
    result(null, res);
  });
};

Subject.getAllSUbjectOfPupil = (pid, result) => {
  var query =
    "SELECT Subject.sid, subjectname FROM Subject INNER JOIN (SELECT sid FROM AssignedSubject WHERE uid = ?) as T ON Subject.sid = T.sid";
  sql.query(query, pid,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("class: ", res);
    result(null, res);
  });
};

Subject.getAverageGradeBySubAndPupil = (sid, pid, result) => {
  console.log(sid, pid)
  var query = "SELECT AVG(marks) as AVG_MARK FROM result INNER JOIN (SELECT tid FROM Test WHERE sid = ?) as T INNER JOIN (SELECT AssignedSubject.aid FROM AssignedSubject WHERE uid = ? AND sid = ?) as TT ON result.aid = TT.aid";
  sql.query(query, [sid, pid, sid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("class: ", res);
    result(null, res);
  });
};

Subject.getSubjectClassTeacherByCid = (cid, result) => {
  
  var query =
    "SELECT Subject.uid, Subject.subjectname, Class.cid, Class.classname, CONCAT(User.firstname, ' ',User.lastname) AS tname, Subject.status FROM Subject "+
    "INNER JOIN Class ON Subject.cid = Class.cid INNER JOIN User ON Subject.uid = User.uid WHERE Subject.cid = '"+cid+"' ORDER BY Class.cid DESC";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("class: ", res);
    result(null, res);
  });
};

module.exports = Subject;

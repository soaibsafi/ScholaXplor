const sql = require("../model/db");

const ClassPupil = function (classPupil) {
  this.csid = classPupil.csid;
  this.uid = classPupil.uid;
  this.cid = classPupil.cid;
};

ClassPupil.assignNewPupil = (newClassPupil, result) => {
  sql.query("INSERT INTO ClassStudent SET ?", newClassPupil, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("Created Class: ", { ...newClass });
    result(null, { ...newClassPupil });
  });
};

ClassPupil.updatePupilAssign = (uid, classPupil, result) => {
  sql.query(
    "UPDATE ClassStudent SET cid = ? WHERE uid = ?",
    [classPupil.cid, uid],
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

      //console.log("Updated Class: ", { id: cid, ...class_c });
      result(null, { ...classPupil });
    }
  );
};

ClassPupil.searchAssignedPupil = (uid, result) => {
  sql.query("SELECT * from ClassStudent where uid= '" + uid + "'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = ClassPupil;

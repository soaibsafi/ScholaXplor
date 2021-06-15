const sql = require("../model/db");

const ClassPupil = function (classPupil) {
  this.csid = classPupil.cid;
  this.uid = classPupil.uid;
  this.cid = classPupil.cid;
};

ClassPupil.assignNewPupil = (newClass, result) => {
  sql.query("INSERT INTO Class SET ?", newClass, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("Created Class: ", { ...newClass });
    result(null, { ...newClass });
  });
};

ClassPupil.updatePupilAssign = (class_c, result) => {
  sql.query(
    "UPDATE Class SET classname = ? WHERE cid = ?",
    [class_c.classname, class_c.cid],
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
      result(null, { ...class_c });
    }
  );
};

module.exports = ClassPupil;

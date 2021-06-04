// con.connect(function (err) {
// 	if (err) throw err;
// 	console.log("Connected!");

// });

con.connect(function (err) {
  if (err) throw err;
  con.query("SELECT * FROM Class", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

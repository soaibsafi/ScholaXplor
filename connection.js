var mysql = require('mysql2');

var con = mysql.createConnection({
	host: "mysql.hrz.tu-chemnitz.de",
	user: "SMS_DB_rw",
	password: "ahK4jeezai",
	database: 'SMS_DB'
});

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


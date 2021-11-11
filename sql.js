var mysql = require('mysql');
var pw = process.env.DBPW;
var conn = mysql.createConnection({
	host: 'localhost',
	user: 'prec',
	password: pw,
	database: 'mysql'
});

exports.sql = conn;

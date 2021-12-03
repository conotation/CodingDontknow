var mysql = require('mysql');
var pw = 'asdflock';
var conn = mysql.createConnection({
	host: 'localhost',
	user: 'prec',
	password: pw,
	database: 'test'
});

exports.sql = conn;

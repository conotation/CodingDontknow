var mysql = require('mysql');
var pw = 'asdflock';
var conn = mysql.createConnection({
	host: 'localhost',
	user: 'prec',
	password: pw,
	database: 'test2',
	multipleStatements: true
});

exports.sql = conn;

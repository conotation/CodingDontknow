var mysql = require('mysql');
var pw = 'asdflock';
var config = {
	host: 'localhost',
	user: 'prec',
	password: pw,
	database: 'test2',
	multipleStatements: true
};

exports.sql = config;

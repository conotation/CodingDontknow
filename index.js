'use strict'

var express = require('express')
var app = express();
var async = require('async');
var bp = require('body-parser');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var conn = require('./sql.js').sql;
var port = 8080;

app.use(bp.json());
app.use(bp.urlencoded({ extend: true }));

app.get('/', (req, res) => {
	console.log('/');
	res.json({
		success: true,
	});
});

app.get('/test', (req, res) => {
	console.log('/test');
	res.json({
		xxxx: 1,
	});
});

app.get('/vtest', (req, res) => {
	console.log('vtest');
	var data = req.body;
	res.render('test.html', {
		data: data,
		dummy: null
	});
});

app.post('/vtest', (req, res) => {
	console.log('vtest-post');
	var data = req.body.query;
	console.log(data);
	async.waterfall([
		(callback) => {
			conn.connect();
			conn.query(data, (e, r, f) => {
				if(e){
				  console.log(e);
				  res.status(401).send('ERROR');
					return;
				}
				callback(null, r);	
			});
		}, (arg1, callback) => {
			console.log(arg1);
			var string = JSON.stringify(arg1);
			callback(null, string);
		}], (err, result) => {
			if(err) {
				console.log(err);
				res.status(402).send('error');
				return;
			}
			conn.end();
			res.render('test.html', {
				data: data,
				dummy: result
			});
	});
});

app.get('/important', (req, res) => {
	console.log('sql');
	console.log(req.body);
});


app.listen(port, () => {
    console.log('server is listen');
});

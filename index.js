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

String.prototype.format = function() {
	    var formatted = this;
	    for( var arg in arguments ) {
		            formatted = formatted.replace("{" + arg + "}", arguments[arg]);
		        }
	    return formatted;
};

const CreateToken = (data) => {
	const token = Buffer.from(data, 'utf8').toString('base64');
	return token;
}

app.get('/', (req, res) => {
	console.log('/');
	var token = CreateToken("asdf1234"); 
	var data = { data : token }; console.log(data);
	res.render('main.html', data);
});

app.get('/test', (req, res) => {
	console.log('/test');
	res.json({
		xxxx: 1,
	});
});

app.get('/register', (req, res) => {
	console.log('vtest');
	var data = req.body;
	res.render('test.html', {
		data: null,
		dummy: null
	});
});

app.get('/login', (req, res) => {
	res.render('login.html');
});

app.post('/login', (req, res) => {
	var id = req.body.id;
	var pw = req.body.pw;
	
	var qu = 'select * from PUSER where u_id=\'{0}\' and u_pw=\'{1}\';'.format(id, pw);
	console.log(qu);
	async.waterfall([ (callback) => {
		try {
		conn.query(qu, (e, r, f) => {
			if(e) callback('SQL ERROR', e);
			else {
				callback(null, r[0]);
			}
		});
		} catch (e) {
			callback('SQL ERROR', e);
		}
	}], (err, result) => {	
		if(err=='SQL ERROR') {
			console.log(result);
			res.json({
				success: false,
				responseCode: 406,
				message: 'SQL ERROR'
			});
		} else {
			if(result == "" || result == undefined) {
				res.json({
				success: true,
				responseCode: 200,
				message: 'auth failed'
				});
			} else {
				var token = CreateToken(id);
				async.waterfall([(callback)=> {
					try {
					conn.query('UPDATE PUSER SET expired=NOW()+3600 where u_id=\''+id+'\'', (e, r, f) => {
						if(e) callback('SQL ERROR2', e); else callback(null, r);
					} catch (e) {
						callback('SQL ERROR', e);
					}}], (err, result) => {
						if(err=='SQL ERROR') {
							console.log(result);
							res.json({
								success: false,
								responseCode: 406,
								message: 'SQL ERROR2'
							}); }}});

				res.json({
					token: token,
					success: true,
					responceCode: 200,
					user: result
				});
			}
		}
	});
});

app.post('/register', (req, res) => {
	var id = req.body.id;
	var pw = req.body.pw;
	
	var qu = 'insert into PUSER(u_id, u_pw) values(\'{0}\', \'{1}\');'.format(id, pw);
	console.log(qu);

	async.waterfall([
		(callback) => {
			conn.query(qu, (e, r, f) => {
				if(e) {
					callback('SQL ERROR', e);
				} else {
					callback(null, r);
				}
			});
		}], (err, result) => {
			if(err=='SQL ERROR'){
				console.log(result);
				res.json({
					statusCode: 406,
					message: 'SQL ERROR:' + result.sqlMessage,
					success: false
				});
			} else {
				res.json({
					statusCode: 200,
					success: true,
					message: 'Register Success'
				});
			}
		});
});

app.get('/sche', (req, res) => {
	res.render('sche.html');
});	

app.post('/sche', (req, res) => {
	var user = req.body.user;
	var day = req.body.day;
	var start = req.body.start;
	var end = req.body.end;
	var seme = req.body.seme;
	var date = req.body.date;
	var content = req.body.content;
	var share = (req.body.share=='on')? 1 : 0;

	var uQuery = '(select u_no from PUSER where u_id=\'{0}\')'.format(user);
	
	var qu ='insert into SCHEDULE(s_user, s_day, s_start, s_end, s_content, s_seme, s_able) values(' + uQuery + ',\'{0}\', \'{1}\', \'{2}\', \'{3}\', \'{4}\', \'{5}\')'.format(day, start, end, content, seme, share);
	console.log(qu);

	async.waterfall([
		(callback) => {
			conn.query(qu, (e, r, f) => {
				if(e) {
					callback('SQL ERROR', e);
				} else {
					callback(null, r);
				}
			});
		}], (err, result) => {
			if(err=='SQL ERROR'){
				console.log(result);
				res.json({
					statusCode: 406,
					message: 'SQL ERROR:' + result.sqlMessage,
					success: false
				});
			} else {
				res.json({
					statusCode: 200,
					success: true,
					message: 'Create Schedule Success',
					result: result
				});
			}
		});
});

app.get('/memo', (req, res) => {
	res.render('memo.html');
});

app.post('/memo', (req, res) => {
	var user = req.body.user;
	var date = req.body.date;
	var content =  req.body.content;

	var uQuery = '(select u_no from PUSER where u_id=\'{0}\')'.format(user);

	var qu ='insert into MEMO(m_user, m_date, m_content) values(' + uQuery + ',"' + date + '", \'{0}\')'.format(content);
	console.log(qu);

	async.waterfall([
		(callback) => {
			conn.query(qu, (e, r, f) => {
				if(e) {
					callback('SQL ERROR', e);
				} else {
					callback(null, r);
				}
			});
		}], (err, result) => {
			if(err=='SQL ERROR'){
				console.log(result);
				res.json({
					statusCode: 406,
					message: 'SQL ERROR:' + result.sqlMessage,
					success: false
				});
			} else {
				res.json({
					statusCode: 200,
					success: true,
					message: 'Create Memo Success',
					result: result
				});
			}
		});
});

app.get('/allUser', (req, res) => {
	var qu = 'select * from PUSER';
	conn.query(qu, (e, r, f) => {
		res.json({
			statusCode: 200,
			success: true,
			message: 'select all User',
			users: r
		});
	});
});

app.get('/allSche', (req, res) => {
	var qu = 'select * from SCHEDULE';
	conn.query(qu, (e, r, f) => {
		res.json({
			statusCode: 200,
			success: true,
			message: 'select all Sche',
			sches: r
		});
	});
});

app.get('allMemo', (req, res) => {
	var qu = 'select * from MEMO';
	conn.query(qu, (e, r, f) => {
		res.json({
			statusCode: 200,
			success: true,
			message: 'select all Memo',
			memos: r
		});
	});
});

app.get('allREFE', (req, res) => {
	var qu = 'select * from REFE';
	conn.query(qu, (e, r, f) => {
		res.json({
			statusCode: 200,
			success: true,
			message: 'select all Refe',
			refes: r
		});
	});
});

app.listen(port, () => {
    console.log('server is listen');
});

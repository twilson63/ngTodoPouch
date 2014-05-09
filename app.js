var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nano = require('nano')('http://admin:admin@localhost:5984');
var async = require('async');
var request = require('request');

var cookies = {};

app.use('/db', function (req, res) {
  var name = req.url.split('/')[1];
  var db_url = 'http://localhost:5984' + req.url;
  req.pipe(request[req.method.toLowerCase()](db_url,
    {headers: { cookie: cookies[name]}})).pipe(res);
});

app.use(bodyParser());

app.get('/api/session/:name', function (req, res) {
  request
    .get('http://localhost:5984/_session', { headers: { cookie: cookies[req.params.name]}})
    .pipe(res);
});

app.post('/api/register', function (req, res) {
  req.body.type = 'user';
  req.body.roles = ['account'];
  var security = { admins: { roles: [], names: []}, members: { roles: ['admins'], names: [req.body.name]}};
  var userdb = nano.use('_users');
  async.series([
    function (cb) { userdb.insert(req.body, 'org.couchdb.user:' + req.body.name, cb); },
    function (cb) { nano.db.create(req.body.name, cb); },
    function (cb) { nano.use(req.body.name).insert(security, '_security', cb); },
    function (cb) { nano.auth(req.body.name, req.body.password, cb)}],
  function (err, results) {
      if (err) { console.log(err); return res.send(500); }
      var headers = results[3][2];
      if (headers && headers['set-cookie']) { cookies[req.body.name] = headers['set-cookie']; }
      res.send(200, { name: req.body.name });
  });
});

app.post('/api/login', function( req, res) {
  nano.auth(req.body.name, req.body.password, function (e,b,headers) {
    if (e) { console.log(e); return res.send(500); }
    if (headers && headers['set-cookie']) { cookies[req.body.name] = headers['set-cookie']; }
    res.send(200, {name: req.body.name} );
  });
});

app.use(express.static('www'));

module.exports = app;

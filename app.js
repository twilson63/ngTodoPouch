var adminUrl = process.env.ADMIN_URL || 'http://admin:admin@localhost:5984';
var userUrl = process.env.USER_URL || 'http://localhost:5984';

var express = require('express');
var morgan = require('morgan');
var app = express();
app.use(morgan());
var bodyParser = require('body-parser');
var nano = require('nano')(adminUrl);
var async = require('async');
var request = require('request');

// TODO this should be a redis session
var cookies = {};

// TODO - maybe nice to only support replication...
app.use('/db', function (req, res) {
  var name = req.url.split('/')[1];
  if (!cookies[name]) { return res.send(401); }
  var db_url = userUrl + req.url;
  req.pipe(request[req.method.toLowerCase()](db_url,
    {headers: { 'Cookie': cookies[name][0]}})).pipe(res);
});

app.get('/session/:name', function (req, res) {
  if (!cookies[req.params.name]) { return res.send(401); }
  res.send(200);
});

app.use('/api', bodyParser());

app.post('/api/register', function (req, res) {
  // default user document attributes
  req.body.type = 'user';
  req.body.roles = ['account'];
  // default security document
  var security = {
    admins: { roles: [], names: []},
    members: { roles: ['admins'], names: [req.body.name]}
  };
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
    console.log(headers);
    if (headers && headers['set-cookie']) { cookies[req.body.name] = headers['set-cookie']; }
    res.send(200, {name: req.body.name});
  });
});

app.use(express.static('www'));

module.exports = app;

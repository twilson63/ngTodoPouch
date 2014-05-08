var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nano = require('nano')('http://localhost:5984');
var async = require('async');
var cookies = {};

app.use(bodyParser());

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

app.post('./api/login', function( req, res) {
  nano.auth(req.body.name, req.body.password, function (e,b,headers) {
    if (e) { console.log(e); return res.send(500); }
    if (headers && headers['set-cookie']) { cookies[req.body.name] = headers['set-cookie']; }
    res.send(200, {name: req.body.name} );
  });
});

app.use('/db', function (req, res) {
  // how to pass username?
  var path = req.url.match(/\/db\/(.*)/)[1];
  req
  .pipe(nano.request[req.method.toLowerCase()]('http://localhost:5984/' + path, {headers: { cookie: cookies[name] } })
  .pipe(res);
});

app.use(express.static('www'));

module.exports = app;

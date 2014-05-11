var register = require('./lib/register');
var forgot = require('./lib/forgot');
var reset = require('./lib/reset');
var login = require('./lib/login');
var session = require('./lib/session');

module.exports = function(app) {
  app.route('/api/login', function (req, res) {
    req.body(function (err, data) {
      login(data, function (err, results, headers) {
        if (err) return res.json({ message: err.message }, 500);
        res.setHeader('set-cookie', headers['set-cookie']);
        res.json(results);
      });
    });
  }).methods("POST");

  app.route('/api/logout', function (req, res) {
    res.setHeader('set-cookie', 'AuthSession=');
    res.json({ok: true});
  });

  app.route('/api/session', function (req, res) {
    var cookie = '';
    if (req.headers && req.headers.cookie) { cookie = req.headers.cookie; }
    session(cookie, function (err, r, body) {
      if (err) return res.json({ message: err.message }, 500);
      res.json(body);
    });
  })
  .methods("GET")
  .nocache();

  app.route('/api/register', function (req, res) {
    req.body(function (err, body) {
      register(body, function (err, results) {
        if (err) return res.json({ message: err.message}, 500);
        res.json({name: body.name});
      });
    });
  }).methods("POST");

  app.route('/api/forgot', function (req, res) {
    req.body(function (err, body) {
      forgot(body, function (err) {
        if (err) return res.json({ message: err.message }, 500);
        res.json({ok: true});
      });
    });
  }).methods("POST");

  app.route('/reset/:code', function (req, res) {
    reset(req.route.params.code, function (err) {
      if (err) return res.json({ message: err.message }, 500);
      res.json({ok: true});
    });
  }).methods("POST");

  return app;
};

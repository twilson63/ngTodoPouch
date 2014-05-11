var register = require('./lib/register');
var forgot = require('./lib/forgot');
var reset = require('./lib/reset');

module.exports = function(app) {
  app.route('/register', function (req, res) {
    req.body(function (body) {
      register(body, function (err, results) {
        if (err) return res.json({ message: err.message}, 500);
        res.json({name: body.name});
      });
    });
  }).methods("POST");

  app.route('/forgot', function (req, res) {
    req.body(function (body) {
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

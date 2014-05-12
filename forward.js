var request = require('request');
var userUrl = process.env.USER_URL || 'http://localhost:5984';

module.exports = function (app) {
  //app.route('/db/*').proxy('http://localhost:5984');
  app.route('/db/*', function (req, res) {
    // no access to futon
    if (/^\/db\/_utils/.test(req.url)) { res.json({message: 'No Access to futon!'}, 500); }
    console.log(req.method + ' : ' + req.url);
    var method = req.method.toLowerCase();
    if (method === 'delete') method = 'del';
    var path = req.url.replace('/db', '');
    req.pipe(request[method](userUrl + path, { json: true }, function (e, r, b) {
      if (e) {
        console.log('Error: ' + e.message);
        return res.json({message: e.message}, 500);
      }
      console.log(r.statusCode + ' : ' + JSON.stringify(b));
      res.json(b, r.statusCode);
    }));

  });

  return app;
};

var request = require('request');
var userUrl = process.env.USER_URL || 'http://localhost:5984';

module.exports = function (app) {
  //app.route('/db/*').proxy('http://localhost:5984');
  app.route('/db/*', function (req, res) {
    var method = req.method.toLowerCase();
    if (method === 'delete') method = 'del';

    var path = req.url.replace('/db', '');
    req.pipe(request[method](userUrl + path))
    .pipe(res);
  });

  return app;
};

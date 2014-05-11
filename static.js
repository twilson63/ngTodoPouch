module.exports = function (app) {
  // handle static pages
  app.route('/*').files(__dirname + '/www');
  app.route('/').file(__dirname + '/www/index.html');

  return app;
};

var test = require('tap').test;
var config = require('./config');


test('App should have a config section that sets up default route', function(t) {
  config({
    otherwise: function(endpoint) {
      t.equals(endpoint, '/todolists/', 'endpoint should be /todolists/');
      t.end();
    }
  });
});

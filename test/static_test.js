var test = require('tap').test;
var rewire = require('rewire');
var st = require('../static');

test('static web requests', function (t) {
  var app = {
    route: function (route) {
      return {
        files: function(path) {
          t.ok(path, 'serving files from ' + path);
        },
        file: function(f) {
          t.ok(f, 'index file set');
          t.end();
        }
      };
    }
  };
  st(app);

});

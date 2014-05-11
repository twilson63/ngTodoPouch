var test = require('tap').test;
var rewire = require('rewire');
var forward = rewire('../forward');

test('proxy all db requests', function (t) {
  var request = null;
  var req = {
    url: '/db/foo',
    method: 'get',
    pipe: function() {
      return {
        pipe: function (res) {
          t.ok(res, 'got successful response');
        }
      };
    }
  };
  var res = {};
  var app = {
    route: function (route, fn) {
      request = fn;
    }
  };
  forward(app);
  process.nextTick(function() {
    request(req, res);
    t.end();
  });
});

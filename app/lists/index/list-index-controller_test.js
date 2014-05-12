var test = require('tap').test;
var indexCtrl = require('./list-index-controller');

test('scope should have an array of todolists', function (t) {
  var scope = {
    $apply: function(fn) {
      fn.call(scope);
    },
    $on: function (event, fn) {

    }
  };
  todoSvc = {
    $all: function(name, cb) {
      cb(null, { rows: [1,2,3]});
    }
  };
  indexCtrl(scope, todoSvc);
  t.ok(scope.lists);
  t.end();
});

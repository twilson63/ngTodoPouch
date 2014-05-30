var test = require('tap').test;
var listCtrl = require('./todolist-list-controller');

test('scope.list should have 2 items', function(t){
  var scope = {};
  listCtrl(scope);
  t.equals(scope.list.length, 2);
  t.end();
});

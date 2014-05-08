var test = require('tap').test;
var listNewCtrl = require('./list-show-controller');

test('success', function (t) {
  var scope = {
    $apply: function (fn) {
      fn.call(scope);
    }
  };
  var todoSvc = {
    $get: function (id) {
      return {
        then: function (fn) {
          fn({ name: 'foo' });
        }
      }
    },
    $put: function (doc) {
      t.equals(doc.tasks[0].description, 'Task1');
      return {
        then: function (fn) {
          t.ok(true);
          fn({ok: true});
        }
      }
    }
  };
  var stateParams = '1';
  var state = {
    go: function() {
      t.end();
    }
  };
  listNewCtrl(scope, todoSvc, stateParams, state);
  //console.log(scope);
  scope.add({description: 'Task1'});
  scope.save(scope.list);
});

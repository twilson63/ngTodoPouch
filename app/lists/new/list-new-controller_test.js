var test = require('tap').test;
var listNewCtrl = require('./list-new-controller');

test('success', function (t) {
  var scope = {};
  var db = {
    $post: function(name, doc) {
      t.equals(doc.name, 'foo');
      return {
        then: function(fn) {
          fn({ok: true});
        }
      }
    }
  };
  var state = {
    go: function(name) {
      t.equals(name, 'lists.index');
      t.end();
    }
  }
  listNewCtrl(scope, db, state);
  scope.save({name: 'foo'});
});

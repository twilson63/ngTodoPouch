var test = require('tap').test;
var todoSvc = require('./todo-service');

test('return all promist', function (t) {
  var db = mockPouch();
  var svc = todoSvc(db);
  svc.$all('foo', function(lists) {
    t.equals(lists.length, 2);
    t.end();
  });
});

test('insert todo list', function (t) {
  var db = mockPouch();
  var svc = todoSvc(db);
  svc.$put('foo', { foo: 'bar'}).then(function(res) {
    t.ok(res.ok);
    t.end();
  });
});

test('get todo list by id', function (t) {
  var db = mockPouch();
  var svc = todoSvc(db);
  svc.$get('foo', 1).then(function(doc) {
    t.equals(doc.foo, 'bar');
    t.end();
  });
});

function mockPouch () {
  return function() {
    return {
      get: function (id) {
        return {
          then: function (fn) {
            fn({foo: 'bar'});
          }
        }
      },
      put: function (doc) {
        return {
          then: function (fn) {
            fn({ok: true});
          }
        }
      },
      query: function (view, cb) {
        cb([1,2]);
      }
    }
  };
}

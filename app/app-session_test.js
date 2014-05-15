var q = require('q');
var test = require('tap').test;
var appSession = require('./app-session');
var origin = 'http://localhost:3000';

test('create session successfully', function (t) {
  var session = appSession(db, {}, origin, q, setTimeout);
  session.create({ name: 'foo' }).then(function(res) {
    t.equals(res.name, 'foo');
    t.ok(res.db);
    t.end();
  });
});

test('destroy session', function (t) {
  var http = { post: httpPostSuccess };
  var session = appSession(db, http, origin, q, setTimeout);
  session.destroy().then(function (res) {
    t.ok(res.data.ok);
    t.end();
  });
});


test('get session successfully', function (t) {
  var http = { get: httpGetSuccess };
  var session = appSession(db, http, origin, q, setTimeout);
  session.get().then(function (user) {
    t.equals(user.name, 'foo');
    t.end();
  });
});

test('get no session ', function (t) {
  var http = { get: httpGetError };
  var session = appSession(db, http, origin, q, setTimeout);
  session.get().then(null, function (data) {
    t.equals(data.error, 'foo');
    t.end();
  });
});

var db = function (name) {
  return {
    sync: function() {}
  }
};

function httpPostSuccess (url) {
  return {
    then: function (success) {
      setTimeout( function () {
        success({ data: { ok: true}});
      }, 100);
    }
  };
}

function httpGetSuccess (url) {
  return {
    then: function (success, error) {
      setTimeout( function () {
        success({ data: { userCtx: { name: 'foo'}}});
      }, 100);
    }
  };
}

function httpGetError (url) {
  return {
    then: function (res) {
      setTimeout( function () {
        res({ data: { error: 'foo' }});
      }, 100);
    }
  };
}

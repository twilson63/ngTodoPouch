var test = require('tap').test;
var rewire = require('rewire');
var routes = rewire('../routes');

test('route /register should be successful', function (t) {
  var request = null;
  var app = {
    route: function (url, fn) {
      if (url === '/register') {
        request = fn;
      }
      return { methods: function () {} }
    }
  };
  routes.__set__('register', function (data, cb) {
    cb(null, {ok: true});
  });
  routes(app);
  request({
    body: function (cb) {
      cb({name: 'foo'});
    }
  }, {
    json: function (obj) {
      console.log(obj);
      t.equals(obj.name, 'foo', 'called json and returned foo');
      t.end();
    }
  });
});

test('route /forgot should be successful', function (t) {
  var request = null;
  var app = {
    route: function (url, fn) {
      if (url === '/forgot') {
        request = fn;
      }
      return { methods: function () {} }
    }
  };
  routes.__set__('forgot', function (data, cb) {
    cb(null, {ok: true});
  });
  routes(app);
  request({
    body: function (cb) {
      cb({email: 'a@a.com'});
    }
  }, {
    json: function (obj) {
      console.log(obj);
      t.ok(obj.ok, 'called json and returned ok');
      t.end();
    }
  });

});

test('route /reset should be successful', function (t) {
  var request = null;
  var app = {
    route: function (url, fn) {
      if (url === '/reset/:code') {
        request = fn;
      }
      return { methods: function () {} }
    }
  };
  routes.__set__('reset', function (data, cb) {
    cb(null, {ok: true});
  });
  routes(app);
  request({
    route: { params: { code: '1234'}}
  }, {
    json: function (obj) {
      console.log(obj);
      t.ok(obj.ok, 'called json and returned ok');
      t.end();
    }
  });
});

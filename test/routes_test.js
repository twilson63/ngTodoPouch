var test = require('tap').test;
var rewire = require('rewire');
var routes = rewire('../routes');
var _ = require('underscore');

var appMock = {
  route: function () { return appMock; },
  methods: function () { return appMock; },
  nocache: function () { return appMock; }
};

test('route /register should be successful', function (t) {
  var request = null;
  var app = _(appMock).extend({ route: function (url, fn) {
    if (url === '/api/register') {
      request = fn;
    }
    return app;
  }});
  routes.__set__('register', function (data, cb) {
    cb(null, {ok: true});
  });
  console.log(app);
  routes(app);
  request({
    body: function (cb) {
      cb(null, {name: 'foo'});
    }
  }, {
    json: function (obj) {
      console.log(obj);
      t.equals(obj.name, 'foo', 'called json and returned foo');
      t.end();
    }
  });
});

// test('route /forgot should be successful', function (t) {
//   var request = null;
//   var app = _(appMock).extend({
//     route: function (url, fn) {
//       if (url === '/forgot') {
//         request = fn;
//       }
//       return app;
//     }
//   });
//   routes.__set__('forgot', function (data, cb) {
//     cb(null, {ok: true});
//   });
//   routes(app);
//   console.log(app);
//   request({ body: function (cb) { cb(null, {email: 'a@a.com'}); } },
//     {
//     json: function (obj) {
//       console.log(obj);
//       t.ok(obj.ok, 'called json and returned ok');
//       t.end();
//     }
//   });
//
// });
//
// test('route /reset should be successful', function (t) {
//   var request = null;
//   var app = {
//     route: function (url, fn) {
//       if (url === '/reset/:code') {
//         request = fn;
//       }
//       return { methods: function () {} }
//     }
//   };
//   routes.__set__('reset', function (data, cb) {
//     cb(null, {ok: true});
//   });
//   routes(app);
//   request({
//     route: { params: { code: '1234'}}
//   }, {
//     json: function (obj) {
//       console.log(obj);
//       t.ok(obj.ok, 'called json and returned ok');
//       t.end();
//     }
//   });
// });

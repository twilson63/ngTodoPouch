var test = require('tap').test;
var appConfig = require('./app-config');

test('call otherwise on urlRouterProvider', function(t) {
  var urlRouterProviderMock = {
    otherwise: function(route) {
      t.equals(route, '/');
      t.end();
    }
  }
  appConfig(urlRouterProviderMock);
});
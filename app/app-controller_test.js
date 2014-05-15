var q = require('q');
var test = require('tap').test;
var appCtrl = require('./app-controller');
// mocks
var scope = {
  $on: function() {}
};
var state = {
  go: function() {}
};
var session = {
  create: function (user) {
    var deferred = q.defer();
    setTimeout(function () { q.resolve({data: { userCtx: 'Foo'}})}, 100);
    return deferred.promise;
  },
  get: function() {
    return {
      then: function(fn) {
        fn({name: 'Foo'});
      }
    }
  },
  destroy: function () {
    return {
      then: function (fn) {
        fn();
      }
    }
  }
};

var $user = 'user';
var $set = function () { };
var $origin = 'http://localhost:3000';


test('app controller should call logout()', function (t) {

  state.go = function (state) {
    if (state === 'splash') {
      t.equals(state, 'splash');
      t.end();
    }
  };

  appCtrl(scope, session, state);
  scope.logout();

});

//
test('set $scope.title to TODO App', function(t) {
  appCtrl(scope, session, state);
  t.equals(scope.title, 'The Ultimate TODO App');
  t.end();
});

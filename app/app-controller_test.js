var test = require('tap').test;
var appCtrl = require('./app-controller');
// mocks
  var scopeMock = {
    $on: function() {}
  };
  var stateMock = {
    go: function() {}
  };
  var dbMock = {
    sync: function() {},
    changes: function() {
      return {
        on: function() {}
      }
    }
  };
  var httpMock = {
    get: function() {
      return {
        then: function() {}
      };
    }
  };
  var $user = 'user';
  var $set = function () { };
  var $origin = 'http://localhost:3000';
var scopeMock = {
  $on: function() {}
};
var stateMock = {
  go: function() {}
};
var dbMock = {
  sync: function() {},
  changes: function() {
    return {
      on: function() {}
    }
  }
};
var httpMock = {
  get: function() {
    return {
      then: function() {}
    };
  }
};
var $user = 'user';
var $set = function () { };
var $origin = 'http://localhost:3000';


test('set $scope.title to TODO App', function(t) {

  appCtrl(scopeMock, stateMock, dbMock, httpMock, $user, $set, $origin);
  t.equals(scopeMock.title, 'The Ultimate TODO App');
  t.end();
});

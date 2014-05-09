// Application Controller
module.exports = function ($scope, $state, $db, $http, $window) {
  var session = function(e, user) {
    $scope.user = user;
    $window.localStorage.setItem('user', user.name);
    var opts = { live: true };
    var remoteDb = 'http://localhost:3000/db/' + user.name;
    $db.replicate.to(remoteDb, opts);
    $db.replicate.from(remoteDb, opts);
    $state.go('lists.index');
  };
  var user = $window.localStorage.getItem('user');
  if (user) {
    $http.get('/api/session/twilson63b').then(function(res) {
      session(null, {name: 'twilson63b'});
    });
  }

  $scope.title = 'TODO App';
  $scope.$on('account:registered', session);
  $scope.$on('account:loggedIn', session);

  $scope.logout = function() {
    $scope.user = null;
    $state.go('splash');
  };
};

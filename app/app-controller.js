// Application Controller
module.exports = function ($scope, $state, $db,
  $http, $user, $set, $origin) {
  var session = function(e, user) {
    $scope.user = user;
    // store current username
    $set('user', user.name);
    var opts = { live: true };
    var remoteDb = $origin + '/db/' + user.name;
    $db.sync(remoteDb, opts);
    $state.go('lists.index');
  };

  // if session still active then auto login...
  if ($user) {
    $http.get('/session/' + $user).then(function(res) {
      session(null, {name: $user});
    }, function() { $state.go('splash'); });
  }

  $scope.title = 'TODO App';
  $scope.$on('account:registered', session);
  $scope.$on('account:loggedIn', session);

  $scope.logout = function() {
    // need to send request to kill session

    $scope.user = null;
    $state.go('splash');
  };

  $db.changes({
    since: 'latest',
    live: true
  }).on('change', function (change) {
    $scope.$broadcast('database:changed', change);
  });

};

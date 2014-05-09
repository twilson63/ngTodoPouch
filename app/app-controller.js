// Application Controller
module.exports = function ($scope, $state, $db, $http, $window) {
  var session = function(e, user) {
    $scope.user = user;
    // store current username
    $window.localStorage.setItem('user', user.name);
    var opts = { live: true };
    var remoteDb = $window.location.origin + '/db/' + user.name;
    $db.sync(remoteDb, opts);

    //$db.replicate.to(remoteDb, opts);
    //$db.replicate.from(remoteDb, opts);
    $state.go('lists.index');
  };

  // if session still active then auto login...
  var user = $window.localStorage.getItem('user');
  if (user) {
    $http.get('/session/' + user).then(function(res) {
      session(null, {name: user});
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

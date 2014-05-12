// Application Controller
module.exports = function ($scope, $state, $db,
  $http, $origin) {
  var session = function(e, user) {
    $scope.user = user.name;
    var opts = { live: true };
    var remoteDb = $origin + '/db/' + user.name;
    $db(user.name).sync(remoteDb, opts);

    $db(user.name).changes({
      since: 'latest',
      live: true
    }).on('change', function (change) {
      $scope.$broadcast('database:changed', change);
    });

    $state.go('lists.index');
  };

  // if session still active then auto login...
  $http.get('/api/session').then(function (res) {
    //console.log(res.data);
    if (res.data.error) { return $state.go('splash'); }
    session(null, { name: res.data.userCtx.name} );
  }, function () { $state.go('splash'); });

  $scope.title = 'The Ultimate TODO App';
  $scope.$on('account:registered', session);
  $scope.$on('account:loggedIn', session);

  $scope.logout = function() {
    // need to send request to kill session
    $http.post('/api/logout').then(function () {
      $scope.user = null;
      $state.go('splash');
    });
  };
};

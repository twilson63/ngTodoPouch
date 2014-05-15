// Application Controller
module.exports = function ($scope, $session, $state) {
  // init scope
  // set app title
  $scope.title = 'The Ultimate TODO App';
  // listen for registration event and create session
  $scope.$on('account:registered', session);
  // listen for login in event and create session
  $scope.$on('account:loggedIn', session);
  // need to send request to kill session
  $scope.logout = function () {
    $session.destroy().then(function () {
      $scope.user = null;
      $state.go('splash');
    });
  };
  // get current session
  $session.get().then(function (user) {
    session(null, user);
  }, function () { $state.go('splash'); });

  // create session and set app state
  function session(e, user) {
    $session.create(user).then(function (results) {
      results.db
        .changes({ since: 'latest', live: true })
        .on('change', function (change) {
          $scope.$broadcast('database:changed', change);
      });
      $scope.user = results.name;
      $state.go('lists.index');
    });
  };
};

// Application Controller
module.exports = function ($scope, $state, $db) {
  $scope.title = 'TODO App';
  $scope.$on('account:registered', function(info) {
    $scope.user = info;
    // sync database
    $db.sync('/db');
    $state.go('lists.index');
  });
  $scope.$on('account:loggedIn', function(info) {
    // sync database
    $db.sync('/db');
    $scope.user = info;
  });
};

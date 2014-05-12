module.exports = function ($scope, $accountSvc, growl) {
  $scope.login = function (user) {
    user.name = angular.lowercase(user.name);
    $accountSvc.$login(user).then(function (info) {
      growl.addSuccessMessage('Successfully Logged in!');
      $scope.$emit('account:loggedIn', { name: user.name });
    }, function (err) {
      growl.addErrorMessage(err.data.message);
    });
  };
};

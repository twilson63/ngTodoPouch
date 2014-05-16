module.exports = function($scope, $accountSvc, growl, $state) {
  $scope.forgot = function (user) {
    $accountSvc.$forgot(user).then(function () {
      growl.addSuccessMessage('Successfully Emailed your reset code!');
      $state.go('splash');
    }, function () {
      growl.addErrorMessage('Could not find user account!');
      user.email = '';
    });
  };
};

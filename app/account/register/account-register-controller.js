module.exports = function ($scope, $accountSvc, growl) {
  $scope.register = function(user) {
    user.name = angular.lowercase(user.name);
    $accountSvc.$register(user).then(function(info) {
      growl.addSuccessMessage('Successfully Registered!');
      $scope.$emit('account:registered', { name: user.name });
    }, function (err) {
      growl.addErrorMessage(err.data.message);
    });
  };
};

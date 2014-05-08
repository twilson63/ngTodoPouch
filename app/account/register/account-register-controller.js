module.exports = function ($scope, $accountSvc) {
  $scope.register = function(user) {
    $accountSvc.$register(user).then(function(info) {
      alert('Successfully Registered!');
      $scope.$emit('account:registered', info);
    })

  };
};

module.exports = function ($scope, $accountSvc) {
  $scope.login = function (user) {
    $accountSvc.$login(user).then(function (info) {
      alert('Successfully Logged In!');
      $scope.$emit('account:loggedIn', { name: user.name });
    });
  };
};

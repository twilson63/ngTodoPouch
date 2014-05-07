module.exports = function ($scope, $todoSvc) {
  $scope.lists = $todoSvc.$all();
};
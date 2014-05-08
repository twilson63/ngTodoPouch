module.exports = function ($scope, $todoSvc,
  $stateParams, $state) {
  $todoSvc.$get($stateParams.id).then(function(doc) {
    $scope.$apply(function() {
      $scope.list = doc;
    });
  });
  $scope.add = function (task) {
    if (!$scope.list.tasks) { $scope.list.tasks = []; }
    $scope.list.tasks.push({ description: task.description});
    $scope.task = null;
  };
  $scope.save = function(list) {
    $todoSvc.$put(list).then(function (doc) {
      $scope.$apply(function() {
        $state.go('lists.index');
      });
    });
  };
};

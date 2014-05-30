module.exports = function ($scope, growl, underscore, $window,
  list, save, remove) {
  var _ = underscore;
  $scope.list = list;

  $scope.save = function(list) {
    save(list).then(function(list) {
      growl.addSuccessMessage('Finished working on this list');
      $scope.$emit('list:updated', list);
    });
  };

  $scope.add = function (task) {
    if (_.isUndefined($scope.list.tasks)) { $scope.list.tasks = []; }
    $scope.list.tasks.push(task);
    $scope.task = null;
  };

  $scope.rmTask = function(task) {
    $scope.list.tasks = _($scope.list.tasks).without(task);
  };

  $scope.rmDone = function(list) {
    var isOpen = function (t) { return !t.done; }
    var result = _.partition(list.tasks, isOpen);
    $scope.list.tasks = _(result).first();
    if (_.isUndefined($scope.list.completed)) { $scope.list.completed = []; }
    $scope.list.completed = _.union(result[0], $scope.list.completed);
  };

  $scope.rmList = function(list) {
    if ($window.confirm('Are you sure?')) {
      remove(list).then(function(res) {
        growl.addSuccessMessage('Successfully remoted list');
        $scope.$emit('list:updated', res);        
      });
    }
  };
};

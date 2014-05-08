module.exports = function ($scope, $todoSvc, $state) {
  $scope.save = function (todolist) {
    $todoSvc.$post(todolist)
      .then(function (list) {
        // growl message
        // redirect to index
        $state.go('lists.index');
      }, function (err) {
        console.log(err);
      });
  };
};

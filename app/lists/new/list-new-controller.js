module.exports = function ($scope, $todoSvc, $state) {
  $scope.save = function (todolist) {
    $todoSvc.$add(todolist)
      .then(function (list) {
        // growl message
        // redirect to index
        $state.go('index');
      }, function (err) {
        console.log(err);
      });
  };
};
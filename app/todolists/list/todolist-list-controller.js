module.exports = function($scope, todolistsDb) {
  todolistsDb().$all().then(function(results) {
    $scope.list = results;
  });
};

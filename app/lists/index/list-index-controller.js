module.exports = function ($scope, $todoSvc) {
  var loadList = function() {
    $todoSvc.$all($scope.user, function(err, res) {
      $scope.$apply(function() {
        $scope.lists = res.rows.map(function(row) {
          return row.value;
        });
      });
    });
  };
  $scope.$on('database:changed', function(e, change) {
    loadList();
  });

  loadList();
};

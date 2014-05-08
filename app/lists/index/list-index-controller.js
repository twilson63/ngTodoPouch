module.exports = function ($scope, $todoSvc) {
  $todoSvc.$all(function(err, res) {
    $scope.$apply(function() {
      $scope.lists = res.rows.map(function(row) {
        return row.value;
      });
    });
  });
};

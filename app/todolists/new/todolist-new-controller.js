module.exports = function($scope, growl, todolistsDb) {
  var db = todolistsDb();

  $scope.save = function(list) {
    db.$post(list)
      .then(function(list) {
        growl.addSuccessMessage('Successfully created list!');
        $scope.$emit('list:created', list);
      },function(err) {
        growl.addErrorMessage(err.message);
      });
  }
}

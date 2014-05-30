module.exports = function($scope, growl) {
  $scope.save = function(list) {
    // do save functionality
    growl.addSuccessMessage('Successfully created list!');
    $scope.$emit('list:created', list);
  }
}

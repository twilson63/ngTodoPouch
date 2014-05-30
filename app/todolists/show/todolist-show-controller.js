module.exports = function ($scope, growl) {

  $scope.save = function(list) {
    growl.addSuccessMessage('Finished working on this list');
    $scope.$emit('list:updated', list);
  };

};

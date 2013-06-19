angular.module('Todo')
  .factory('$db', function($pouch) {
    return $pouch('idb://todos');
  });

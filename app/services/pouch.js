angular.module('Todo')
  .value('$pouch', Pouch('idb://todos'));
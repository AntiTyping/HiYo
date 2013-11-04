'use strict';

angular.module('HiYoApp')
  .controller('MainCtrl', function ($scope, Task, $resource) {
    $scope.awesomeThings = Task.query();

    $scope.add = function(item) {
      var task = new Task();
      task.name = item.name;
      task.priority = item.priority;
      task.$save();
      $scope.awesomeThings.push(task);
    };
    $scope.remove = function(index, item) {
      var id = item.url.replace("http://localhost:8888/tasks/", '');
      item.$remove({id: id});
      $scope.awesomeThings.splice(index, 1);
    };
    $
  }).factory('Task', ['$resource',
  function($resource){
    return $resource('http://localhost\\:8888/:path/:id', {}, {
      query: {method:'GET', params:{path:'tasks.json'}, isArray:true},
      get: {method:'GET', params:{path:''}},
      save: {method:'POST', params:{path:'tasks.json'}},
      remove: {method:'DELETE', params:{path:'tasks'}}
    });
  }]);;

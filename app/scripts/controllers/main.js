'use strict';

angular.module('HiYoApp')
  .controller('MainCtrl', function ($scope, Task, $resource) {
    $scope.tasks = Task.query();

    $scope.add = function(item) {
      var task = new Task();
      task.name = item.name;
      task.priority = item.priority;
      task.$save();
      $scope.tasks.push(task);
    };

    $scope.remove = function(index, item) {
      var id = item.url.replace("http://localhost:3000/tasks/", '');
      item.$remove({id: id});
      $scope.tasks.splice(index, 1);
    };
  })
  .factory('Task', ['$resource', function($resource){
    return $resource('http://localhost\\:3000/:path/:id', {}, {
      query: {method:'GET', params:{path:'tasks.json'}, isArray:true},
      get: {method:'GET', params:{path:''}},
      save: {method:'POST', params:{path:'tasks.json'}},
      remove: {method:'DELETE', params:{path:'tasks'}}
    });
  }]);;

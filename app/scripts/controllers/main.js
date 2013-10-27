'use strict';

angular.module('HiYoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      {name: 'HTML5 Boilerplate', priority: "high"},
      {name: 'AngularJS', priority: "low"},
      {name: 'Karma', priority: "medium"}
    ];
  });

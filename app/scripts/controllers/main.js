'use strict';

angular.module('HiYoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      {name: 'HTML5 Boilerplate', tags: "high"},
      {name: 'AngularJS', tags: "low"},
      {name: 'Karma', tags: "medium"}
    ];
  });

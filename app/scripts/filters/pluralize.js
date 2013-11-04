'use strict';

angular.module('HiYoApp')
  .filter('pluralize', function() {
    return function(number, noun){
      if (number == 1)
        return number + " " + noun;
      return number + " " + noun + "s";
    }
  });

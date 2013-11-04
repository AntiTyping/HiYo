'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(module('HiYoApp'));

  var MainCtrl, scope, Task, $save;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    $save = jasmine.createSpy("$save");
    Task = function Task() {
      return {
        $save: $save
      };
    };
    Task.query = function query() {
      return [1, 2];
    };
    MainCtrl = $controller('MainCtrl', {
      $scope: scope, Task: Task
    });
  }));

  describe("scope", function() {
    it('should attach a list of tasks to the scope', function () {
      expect(scope.tasks).toEqual([1, 2]);
    });
  });

  describe("add", function() {
    var item;

    beforeEach(function() {
      item = jasmine.createSpy("item");
    });

    it("should save new task", function() {
      scope.add(item);
      expect($save).toHaveBeenCalled();
    });

    it("should adds new task to task list", function() {
      scope.add(item);
      expect(scope.tasks.length).toEqual(3);
    });
  });

  describe("remove", function() {
    var item;

    beforeEach(function() {
      item = jasmine.createSpy("item");
      item.$remove = jasmine.createSpy("$remove");
      item.url = "http://localhost:3000/tasks/111.json";
    });

    it("should remove new task", function() {
      scope.remove(1, item);
      expect(item.$remove).toHaveBeenCalled();
    });

    it("should remove task to task list", function() {
      scope.remove(1, item);
      expect(scope.tasks.length).toEqual(1);
    });
  });
});

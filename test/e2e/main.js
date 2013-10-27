'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('ToDo App', function() {

  describe("ToDo list", function() {
    it('should display list of items', function() {
      browser().navigateTo('/proxy/');
      expect(repeater('tr').count()).toBe(4);
      expect(element('tr:nth-child(1)').text()).toMatch(/HTML5 Boilerplate/);
    });
  });

  describe("Add item button", function() {
    it('should have placeholder text', function() {
      browser().navigateTo('/proxy/');
      expect(element('[ng\\:model="item"]').attr('placeholder')).toEqual("Add new item here");
    });
  });

  describe("Add item button", function() {
    it('should add a new item', function() {
      browser().navigateTo('/proxy/');
      input('item').enter("New item");
      element('button.js-add').click();
      expect(repeater('tr').count()).toBe(5);
    });

    it('should clear the new item box', function() {
      browser().navigateTo('/proxy/');
      input('item').enter("New item");
      element('button.js-add').click();
      expect(input('item').val()).toEqual('');
    });
  });

  it('should remove a last item', function() {
    browser().navigateTo('/proxy/');
    element('button:last').click();
    expect(repeater('tr').count()).toBe(3);
  });

  it("should find an item", function() {
    browser().navigateTo('/proxy/');
    input("query").enter("karma");
    expect(repeater('tr').count()).toBe(2);
  });

  describe("clear search button", function() {
    it("should show all the tasks", function() {
      browser().navigateTo('/proxy/');
      input("query").enter("karma");
      expect(repeater('tr').count()).toBe(2);
      element(".js-clear").click();
      expect(repeater('tr').count()).toBe(4);
    });

    it("should show clear the search box", function() {
      browser().navigateTo('/proxy/');
      input("query").enter("karma");
      element(".js-clear").click();
      expect(input("query").val()).toEqual('');
    });
  });
});

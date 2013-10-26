'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('ToDo App', function() {

  describe("ToDo list", function() {
    it('should display list of items', function() {
      browser().navigateTo('../../app/index.html');
      expect(repeater('li').count()).toBe(3);
      expect(element('li:first').text()).toMatch(/HTML5 Boilerplate/);
    });
  });

  it('should add a new item', function() {
    browser().navigateTo('../../app/index.html');
    input('item').enter("New item");
    element('button:first').click();
    expect(repeater('li').count()).toBe(4);
  });

  it('should remove a last item', function() {
    browser().navigateTo('../../app/index.html');
    element('button:last').click();
    expect(repeater('li').count()).toBe(2);
  });

  it("should find an item", function() {
    browser().navigateTo('../../app/index.html');
    input("query").enter("karma");
    expect(repeater("li").count()).toBe(1);
  });
});

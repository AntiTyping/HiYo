'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('ToDo App', function() {

  describe("ToDo list", function() {
    it('should display list of items', function() {
      browser().navigateTo('../../app/index.html');
      expect(repeater('tr').count()).toBe(4);
      expect(element('tr:nth-child(1)').text()).toMatch(/HTML5 Boilerplate/);
    });
  });

  it('should add a new item', function() {
    browser().navigateTo('../../app/index.html');
    input('item').enter("New item");
    element('button:first').click();
    expect(repeater('tr').count()).toBe(5);
  });

  it('should remove a last item', function() {
    browser().navigateTo('../../app/index.html');
    element('button:last').click();
    expect(repeater('tr').count()).toBe(3);
  });

  it("should find an item", function() {
    browser().navigateTo('../../app/index.html');
    input("query").enter("karma");
    expect(repeater('tr').count()).toBe(2);
  });
});

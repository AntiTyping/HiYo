'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('ToDo App', function() {

  beforeEach(function() {
    browser().navigateTo('/proxy/');
  });

  describe("ToDo list", function() {
    it('should display list of items', function() {
      expect(repeater('tr.item').count()).toBe(3);
      expect(element('tr:nth-child(1)').text()).toMatch(/HTML5 Boilerplate/);
    });
  });

  describe("Add item button", function() {
    it('should have placeholder text', function() {
      expect(element('[ng\\:model="item.name"]').attr('placeholder')).toEqual("Add new item here");
    });
  });

  describe("Add item button", function() {
    it('should add a new item', function() {
      input('item.name').enter("New item");
      element('button.js-add').click();
      expect(element('tr:last').text()).toMatch(/New item/);
    });

    it('should clear the new item box', function() {
      input('item.name').enter("New item");
      element('button.js-add').click();
      expect(input('item.name').val()).toEqual('');
    });

    it('should set tags to high', function() {
      input('item.name').enter("New item");
      element('button.js-add').click();
      expect(input('item.tags').val()).toEqual('high');
    });
  });

  it('should remove a last item', function() {
    element('button:last').click();
    expect(repeater('tr.item').count()).toBe(2);
  });


  describe("Navigation", function() {
    describe("Home", function() {
      it("should navigate to home page", function() {
        element("a:contains('Home')").click();
        expect(browser().location().url()).toBe("/");
      });

      it("should display about page", function() {
        expect(element(".js-main").text()).toMatch(/Task/);
      });
    });

    describe("About", function() {
      it("should navigate to about page", function() {
        element("a:contains('About')").click();
        expect(browser().location().url()).toBe("/about");
      });

      it("should display about page", function() {
        browser().navigateTo('/proxy/#/about');
        expect(element(".js-main").text()).toMatch(/About/);
      });
    });
  });

  describe("Tags", function() {
    it("should display tags", function() {
      expect(element("span.tags:first").text()).toMatch(/high/);
    });
  });

  describe("Filters", function() {
    describe("Keywords", function() {
      it("should find an item", function() {
        input("query.name").enter("karma");
        expect(repeater('tr.item').count()).toBe(1);
      });
    });

    describe("Tags", function() {
      describe("filters", function() {
        describe("high", function() {
          it("should display tagged items only", function() {
            element("a.tagFilter:contains('high')").click();
            expect(repeater('tr.item').count()).toBe(1);
          });
        });

        describe("medium ", function() {
          it("should display tagged items only", function() {
            element("a.tagFilter:contains('medium')").click();
            expect(repeater('tr.item').count()).toBe(1);
          });
        });

        describe("low", function() {
          it("should display tagged items only", function() {
            element("a.tagFilter:contains('low')").click();
            expect(repeater('tr.item').count()).toBe(1);
          });
        });

        describe("All", function() {
          it("should display all items" , function() {
            element("a.tagFilter:contains('All')").click();
            expect(repeater('tr.item').count()).toBe(3);
          });
        });
      });
    });

    describe("clear search button", function() {
      it("should show all the tasks", function() {
        input("query.name").enter("karma");
        expect(repeater('tr.item').count()).toBe(1);
        element(".js-clear").click();
        expect(repeater('tr.item').count()).toBe(3);
      });

      it("should clear the search box", function() {
        input("query.name").enter("karma");
        element(".js-clear").click();
        expect(input("query.name").val()).toEqual('');
      });
    });
  });
});

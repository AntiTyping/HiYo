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


  describe("Navigation", function() {
    describe("Home", function() {
      it("should navigate to home page", function() {
        browser().navigateTo('/proxy/');
        element("a:contains('Home')").click();
        expect(browser().location().url()).toBe("/");
      });

      it("should display about page", function() {
        browser().navigateTo('/proxy/#/');
        expect(element(".js-main").text()).toMatch(/Task/);
      });
    });

    describe("About", function() {
      it("should navigate to about page", function() {
        browser().navigateTo('/proxy/');
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
      browser().navigateTo('/proxy/');
      expect(element("span.tags:first").text()).toMatch(/high/);
    });
  });

  describe("Filters", function() {
    describe("Keywords", function() {
      it("should find an item", function() {
        browser().navigateTo('/proxy/');
        input("query.name").enter("karma");
        expect(repeater('tr').count()).toBe(2);
      });
    });

    describe("Tags", function() {
      describe("filters", function() {
        describe("high", function() {
          it("should display tagged items only", function() {
            browser().navigateTo('/proxy/');
            element("a.tagFilter:contains('high')").click();
            expect(repeater('tr').count()).toBe(2);
          });
        });

        describe("medium ", function() {
          it("should display tagged items only", function() {
            browser().navigateTo('/proxy/');
            element("a.tagFilter:contains('medium')").click();
            expect(repeater('tr').count()).toBe(2);
          });
        });

        describe("low", function() {
          it("should display tagged items only", function() {
            browser().navigateTo('/proxy/');
            element("a.tagFilter:contains('low')").click();
            expect(repeater('tr').count()).toBe(2);
          });
        });

        describe("All", function() {
          it("should display all items" , function() {
            browser().navigateTo('/proxy/');
            element("a.tagFilter:contains('All')").click();
            expect(repeater('tr').count()).toBe(4);
          });
        });
      });
    });

    describe("clear search button", function() {
      it("should show all the tasks", function() {
        browser().navigateTo('/proxy/');
        input("query.name").enter("karma");
        expect(repeater('tr').count()).toBe(2);
        element(".js-clear").click();
        expect(repeater('tr').count()).toBe(4);
      });

      it("should clear the search box", function() {
        browser().navigateTo('/proxy/');
        input("query.name").enter("karma");
        element(".js-clear").click();
        expect(input("query.name").val()).toEqual('');
      });
    });
  });
});

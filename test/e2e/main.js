'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('ToDo App', function() {

  beforeEach(function() {
    browser().navigateTo('/proxy/');
      element('table').query(function(table, done) {
        // console.log(">>>");
        var children = table.children();
        if(children.length > 1) {
          // console.log("2>>>");
          var elements = table.find('button.js-done');
          // console.log(elements.length);
          elements.click();
        };
        done();
      });
      input('item.name').enter("Medium priority item");
      select('item.priority').option("medium");
      element('button.js-add').click();

      input('item.name').enter("Low priority item");
      select('item.priority').option("low");
      element('button.js-add').click();

      input('item.name').enter("High priority item");
      select('item.priority').option("high");
      element('button.js-add').click();
  });

  describe("ToDo list", function() {
    it('should display list of items', function() {
      expect(repeater('tr.item').count()).toBe(3);
      expect(element('tr:nth-child(1)').text()).toMatch(/Medium priority item/);
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

    it('should set priority to high', function() {
      input('item.name').enter("New item");
      element('button.js-add').click();
      expect(input('item.priority').val()).toEqual('high');
    });
  });

  it('should remove a last item', function() {
    expect(repeater('tr.item').count()).toBe(3);
    element('button.js-done:last').click();
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

  describe("Priority", function() {
    it("should display priority", function() {
      expect(element("span.priority:first").text()).toMatch(/medium/);
    });
  });

  describe("Filters", function() {
    describe("Keywords", function() {
      it("should find an item", function() {
        input("query.name").enter("medium");
        expect(repeater('tr.item').count()).toBe(1);
      });
    });

    describe("Priority", function() {
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
        input("query.name").enter("medium");
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

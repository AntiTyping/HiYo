'use strict';

describe('HiYoApp', function() {

  beforeEach(module('HiYoApp'));

  describe('pluralizeFilter', function() {
    it('should return string length', inject(function(pluralizeFilter) {
      expect(pluralizeFilter(0, "apple")).toBe('0 apples');
      expect(pluralizeFilter(1, "apple")).toBe('1 apple');
      expect(pluralizeFilter(2, "apple")).toBe('2 apples');
    }));
  });
});


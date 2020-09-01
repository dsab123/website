import {Header} from '../../src/resources/components/header';
import {Router} from 'aurelia-router';

jest.mock('aurelia-router', () => ({
    Router: { } 
    // I prefer this to the simpler jest.mock('aurelia-router')
  }));
  

describe('Header Component', () => {
    let header;

    beforeEach(() => {
      // arrange
      header = new Header(Router);
    });

    test('that flipConverter() toggles convertNavItems', () => {
      // arrange part 2
      var oldConvertNavItemsValue = header.convertNavItems;

      // act
      header.flipConverterText();
      
      // assert
      var currentOldConvertNavItemsValue = header.convertNavItems;
      expect(oldConvertNavItemsValue).not.toBe(currentOldConvertNavItemsValue);
    });
});
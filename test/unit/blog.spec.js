import {PostApi} from '../../src/resources/api/postApi';
import {Blog} from '../../src/resources/components/blog';

jest.mock('../../src/resources/api/postApi', () => ({
    PostApi: {
      publish: jest.fn()
    }
  }));

describe('Blog Component', () => {
    let blog;

    beforeEach(() => {
      // arrange
      blog = new Blog(PostApi);
    });

    test('that getDefaultPostId() returns 1', () => {
      const defaultPostId = 1;
      
      // act/assert
      expect(blog.getDefaultPostId()).toBe(defaultPostId);
    });
});


// for when I add tests for api
// commenting out for now because of a Fetch API issue that I don't have time to look at right now
//import {Api} from '../../src/resources/api/api';
//
//describe('Blog Component', () => {
//    let api;

//    beforeEach(() => {
//        api = new Api();
//    });

//    test('that Api is initialized with baseUrl and httpClient', () => {
//        // find out if there's an equivalent of NUnit's Assert.Multiple(() => {})
//        expect(api.baseUrl).toBeTruthy();
//        expect(api.httpClient).toBeTruthy();
//    });
//});
const request = require('supertest');
const nock = require('nock');
const {
  random: {
    uuid,
  },
} = require('faker');

const app = require('../../index.js');

describe('Walking Skeleton testing flow from dummy FB server to app to dummy Albert server', () => {
  const dummyAlbertDomain = 'http://localhost';
  const username = 'dummy@bla.com';
  const password = 'dummyPassword';
  const testPath = '/up';
  const credentialsObject = {
    _id: uuid(),
    username,
  };

  beforeAll(() => {
    nock(dummyAlbertDomain)
      .post('/credentials', { username, password })
      .reply(200, credentialsObject);
  });

  afterAll(() => {
    app.close();
  });

  it('should recieve an incomming http request which triggers an external http request using the SDK', async () => {
    await request(app)
      .get(testPath)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(credentialsObject);
    expect(nock.isDone()).toBeTruthy();
  });
});

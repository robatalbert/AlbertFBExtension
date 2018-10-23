const request = require('supertest');
const nock = require('nock');
const {
  internet: {
    url,
    email,
    password: randomPassword,
  },
  random: {
    uuid,
  },
} = require('faker');

const app = require('../index.js');

describe('Walking Skeleton testing flow from dummy FB server to app to dummy Albert server', () => {
  const dummyAlbertDomain = url();
  const username = email();
  const password = randomPassword();
  const greetingPath = '/hello';
  const credentialsObject = {
    _id: uuid(),
    username,
  };

  beforeAll(() => {
    nock(dummyAlbertDomain)
      .post('/credentials', { username, password })
      .reply(200, credentialsObject);
  });

  it('should send an incomming http request which triggers an external http request using the SDK', async () => {
    await request(app)
      .get(greetingPath)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(credentialsObject);
    expect(nock.isDone()).toBeTruthy();
  });
});

const nock = require('nock');
const {
  random: {
    uuid,
  },
} = require('faker');

const upRouteHandler = require('../../src/route-handlers/up-handler');

const username = 'dummy@bla.com';
const password = 'dummyPassword';
const dummyAlbertDomain = 'http://localhost';
const credentialsObject = {
  _id: uuid(),
  username,
};


describe('Up Route Handler', () => {
  beforeAll(() => {
    nock(dummyAlbertDomain)
      .post('/credentials', { username, password })
      .reply(200, credentialsObject);
  });

  it('should use the Albert SDK to generate and return a dummy credentials object', async () => {
    const ctx = {};
    await upRouteHandler(ctx);
    expect(ctx.header).toMatchObject({ 'Content-Type': 'application/json' });
    expect(ctx.status).toBe(200);
    expect(ctx.body).toMatchObject(credentialsObject);
    expect(nock.isDone()).toBeTruthy();
  });
});

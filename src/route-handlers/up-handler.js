const { AuthenticationApi } = require('albert-js-web-api');

const albert = new AuthenticationApi('http://localhost');

const up = async (res) => {
  const credentials = await albert.createNewCredentials('dummy@bla.com', 'dummyPassword');
  res.body = credentials;
  res.header = { 'Content-Type': 'application/json' };
  res.status = 200;
};

module.exports = up;

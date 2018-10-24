const server = require('./src/app');

const PORT = process.env.PORT || 8081;

module.exports = server.listen(PORT);

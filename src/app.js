const Koa = require('koa');
const router = require('./routers');

const app = new Koa();
app.use(router.routes());

module.exports = app;

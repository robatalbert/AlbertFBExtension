const Router = require('koa-router');

const upRouter = require('./up-router');

const router = new Router();

router.use('/up', upRouter.routes());

module.exports = router;

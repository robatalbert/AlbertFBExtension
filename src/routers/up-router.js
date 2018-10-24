const Router = require('koa-router');
const handlers = require('../route-handlers');

const router = new Router();
router.get('/', handlers.up);

module.exports = router;

'use strict';

const Router = require('koa-router');
const router = new Router();

router.prefix('/news');

router.get('/', async (ctx, next) => {
  ctx.body = 'news';
});

module.exports = router;

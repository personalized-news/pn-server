'use strict';

const Router = require('koa-router');
const router = new Router();

router.prefix('/about');

router.get('/', (ctx, next) => {
  ctx.body = 'About personalized-news';
});

module.exports = router;

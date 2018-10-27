'use strict';

const Router = require('koa-router');
const router = new Router();

router.prefix('/about');

router.get('/', async (ctx, next) => {
  ctx.body = {
    status: 200,
    message: 'About personalized-news'
  };
});

module.exports = router;

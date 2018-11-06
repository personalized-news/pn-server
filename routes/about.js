'use strict';

const Router = require('koa-router');
const router = new Router();

router.prefix('/about');

router.get('/', async (ctx, next) => {
  ctx.body = {
    code: 0,
    message: 'About personalized-news'
  };
});

module.exports = router;

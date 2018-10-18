'use strict';

const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'Home Page';
});

router.get('/about', (ctx, next) => {
  ctx.body = 'About personalized-news';
});

module.exports = router;

'use strict';

const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'Home Page';
});
router.get('/user', (ctx, next) => {
  ctx.body = 'Personality';
});
router.get('/:id', (ctx, next) => {
  ctx.status = 404;
  ctx.body = 'Not Found';
});

module.exports = router;

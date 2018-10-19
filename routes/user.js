'use strict';

const Router = require('koa-router');
const router = new Router();

const { checkLogin } = require('../controllers/user');

router.prefix('/user');

router.get('/', (ctx, next) => {
  ctx.body = 'Personality';
});

router.post('/login', async (ctx, next) => {
  try {
    await next();
    await checkLogin(ctx, next);
    console.log(ctx.request.body);
    console.log(ctx.response)
  } catch (e) {
    if (e.status === 401) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
      ctx.body = 'cant haz that';
    } else {
      throw e;
    }
  }
});

module.exports = router;

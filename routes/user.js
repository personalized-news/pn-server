'use strict';

const Router = require('koa-router');
const router = new Router();

const {
  checkLogin,
  checkSignup,
  index,
  signup,
  login,
  logout
} = require('../controllers/user');

router.prefix('/user');

router.get('/', index);

router.get('/signup', async (ctx, next) => {
  ctx.body = 'GET / signup page';
});

router.post('/signup', signup);

router.get('/login', async (ctx, next) => {
  ctx.body = 'GET / login page';
});

router.post('/login', login);

router.get('/logout', async (ctx, next) => {
  ctx.body = 'GET / logout page';
});

router.post('/logout', logout);

module.exports = router;

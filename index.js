'use strict';

const Koa = require('koa');
const auth = require('koa-basic-auth');
const router = require('./routes');
const config = require('./config');

const app = new Koa();

app.use(async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
      ctx.body = 'cant haz that';
    } else {
      throw err;
    }
  }
});

// require auth
app.use(auth({ name: 'ZYSzys', pass: '123' }));

// secret response
app.use(router.routes());

if (!module.parent) {
  app.listen(config.port);
  console.log(`Server running at http://localhost:${config.port}`);
}

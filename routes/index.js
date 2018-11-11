'use strict';

const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const basename = path.basename(module.filename);
const router = new Router();

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const route = require(path.resolve(__dirname, file));
    router.use(route.routes(), route.allowedMethods());
  });

router.get('/', async (ctx, next) => {
  ctx.body = {
    code: 0,
    message: 'Home Page'
  };
});

module.exports = router;

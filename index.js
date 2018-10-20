'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const config = require('./config');
const router = require('./routes');
const app = new Koa();

app.use(bodyParser());
app.use(logger());

// router
app.use(router.routes());
app.use(router.allowedMethods());

if (!module.parent) {
  app.listen(config.port);
  console.log(`Server running at http://localhost:${config.port}`);
}

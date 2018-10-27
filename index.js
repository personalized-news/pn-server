'use strict';

const { cyan } = require('chalk');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const session = require('koa-session');

const config = require('./config');
const router = require('./routes');
const app = new Koa();

app.use(cors());
app.keys = ['some secret hurr'];

app.use(session(config.session, app));
app.use(bodyParser());
app.use(logger());

// router
app.use(router.routes());
app.use(router.allowedMethods());

if (!module.parent) {
  app.listen(config.port);
  console.log(cyan(`Server running at http://localhost:${config.port}`));
}

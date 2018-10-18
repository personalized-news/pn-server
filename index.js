'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const config = require('./config');
const home = require('./routes/home');
const user = require('./routes/user');
const app = new Koa();

app.use(bodyParser());
app.use(logger());

// secret response
app.use(home.routes());
app.use(home.allowedMethods());
app.use(user.routes());
app.use(user.allowedMethods());

if (!module.parent) {
  app.listen(config.port);
  console.log(`Server running at http://localhost:${config.port}`);
}

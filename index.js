'use strict';

const { cyan } = require('chalk');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const compress = require('koa-compress');

const config = require('./config');
const router = require('./routes');
const app = new Koa();

app.use(cors());
app.use(
  compress({
    filter: function(content_type) {
      return /text/i.test(content_type);
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
  })
);

app.keys = ['keys', 'keykeys'];
app.use(
  session({
    store: redisStore({}),
    key: 'pn:sess'
  })
);

app.use(bodyParser());
app.use(logger());

// router
app.use(router.routes());
app.use(router.allowedMethods());

if (!module.parent) {
  app.listen(config.port);
  console.log(cyan(`Server running at http://localhost:${config.port}`));
}

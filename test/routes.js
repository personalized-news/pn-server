'use strict';

const Koa = require('koa');
const supertest = require('supertest');
const router = require('../routes');

describe('GET /', function() {
  const app = new Koa();
  app.use(router.routes());
  app.use(router.allowedMethods());

  const request = supertest.agent(app.listen());

  it('GET / OK', function(done) {
    request.get('/').expect(200, done);
  });

  it('GET /about OK', function(done) {
    request.get('/about').expect(200, done);
  });
  it('GET /user OK', function(done) {
    request.get('/user').expect(200, done);
  });

  after(() => process.exit());
});

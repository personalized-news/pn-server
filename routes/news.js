'use strict';

const Router = require('koa-router');
const router = new Router();

const { showAllNews } = require('../controllers/news');

router.prefix('/news');

router.get('/', showAllNews);

module.exports = router;

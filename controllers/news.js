'use strict';

const { getNews, getNewsList } = require('../models/news');

const news = () => {};

const showAllNews = async (ctx, next) => {
  const newsList = await getNewsList();
  ctx.body = newsList;
};

module.exports = {
  news,
  showAllNews
};

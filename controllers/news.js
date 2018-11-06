'use strict';

const { getNews, getNewsList } = require('../models/news');

const news = () => {};

const showAllNews = async (ctx, next) => {
  try {
    const newsList = await getNewsList();
    ctx.body = {
      code: 0,
      newsList: newsList.slice(0, 20)
    };
  } catch (e) {
    ctx.body = {
      code: 0,
      message: 'No news'
    };
  }
};

module.exports = {
  news,
  showAllNews
};

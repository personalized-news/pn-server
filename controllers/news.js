'use strict';

const { getNews, getNewsList } = require('../models/news');

const news = () => {};

const showAllNews = async (ctx, next) => {
  try {
    const newsList = await getNewsList();
    ctx.body = {
      staus: 200,
      data: newsList
    };
  } catch (e) {
    console.log(e);
    ctx.body = {
      status: 200,
      message: 'No news'
    };
  }
};

module.exports = {
  news,
  showAllNews
};

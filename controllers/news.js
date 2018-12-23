'use strict';
const zlib = require('zlib');
const { getNews, getNewsByChannelName } = require('../models/news');

const news = () => {};

const showAllNews = async (ctx, next) => {
  // const query = ctx.query;
  // console.log(query);
  try {
    const newsList = await getNews();
    ctx.body = {
      code: 0,
      newsList: JSON.stringify(newsList.slice(0, 20))
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

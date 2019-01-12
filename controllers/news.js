'use strict';
const { getNews, getNewsByChannelName } = require('../models/news');
const { checkToken } = require('./user');
const news = () => {};

const showAllNews = async (ctx, next) => {
  // const query = ctx.query;
  // console.log(query);
  try {
    const newsList = await getNews();
    ctx.compress = true;
    const token = ctx.request.header.authorization;
    const username = ctx.session.username;
    if (token && !checkToken(token)) {
      // 当请求头部有token时，如果token过期并且用户处于登陆状态就让用户重新登陆
      ctx.body = {
        code: 0,
        newsList: newsList.slice(0, 20),
        message: 'invalid token'
      };
    } else {
      ctx.body = {
        code: 0,
        newsList: newsList.slice(0, 20),
        username: username
      };
    }
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

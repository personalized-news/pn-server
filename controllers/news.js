'use strict';
const {
  getNews,
  getNewsByChannelName,
  getNewsTotal,
  getChannelNewsTotal
} = require('../models/news');
const { checkToken } = require('./user');
const news = () => {};

const showAllNews = async (ctx, next) => {
  const channelName = ctx.query.channel;
  const pageNumber = ctx.query.pageNumber; // 请求的新闻页号
  console.log(channelName, pageNumber); // 查询的新闻频道
  try {
    let newsList = [];
    let total = 0;
    if (channelName === 'recommend') {
      newsList = await getNews(pageNumber);
      total = await getNewsTotal();
    } else {
      newsList = await getNewsByChannelName(channelName, pageNumber);
      total = await getChannelNewsTotal(channelName);
    }
    ctx.compress = true;
    const token = ctx.request.header.authorization;
    if (token && !checkToken(token)) {
      // 当请求头部有token时，如果token过期并且用户处于登陆状态就让用户重新登陆
      ctx.body = {
        code: 0,
        newsList: newsList,
        message: 'invalid token',
        total: total / 20
      };
    } else {
      ctx.body = {
        code: 0,
        newsList: newsList,
        total: total / 20
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

'use strict';
const { getNews, getNewsByChannelName } = require('../models/news');
const { checkToken } = require('./user');
const news = () => {};

const showAllNews = async (ctx, next) => {
  const channelName = ctx.query.channel;
  const pageNumber = ctx.query.pageNumber; // 请求的新闻页号
  console.log(channelName, pageNumber); // 查询的新闻频道
  try {
    let newsList = [];
    let st, end;
    if (channelName === 'recommend') newsList = await getNews();
    else newsList = await getNewsByChannelName(channelName);
    // 每页显示20条新闻, 当请求的页号不是最后一页时,也就是说肯定可以返回20条新闻
    // 把这20条新闻找出来
    if (newsList.length / 20 >= pageNumber) {
      st = (pageNumber - 1) * 20;
      end = pageNumber * 20;
    } else {
      let remainder = newsList.length % 20;
      end = newsList.length;
      st = newsList.length - remainder;
    }
    ctx.compress = true;
    const token = ctx.request.header.authorization;
    if (token && !checkToken(token)) {
      // 当请求头部有token时，如果token过期并且用户处于登陆状态就让用户重新登陆
      ctx.body = {
        code: 0,
        newsList: newsList.slice(st, end),
        message: 'invalid token',
        total: newsList.length / 20
      };
    } else {
      ctx.body = {
        code: 0,
        newsList: newsList.slice(st, end),
        total: newsList.length / 20
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

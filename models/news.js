'use strict';

const { News } = require('../lib/mongo');

function getNewsTotal() {
  return News.find({}).countDocuments();
}

function getNews(pageNumber) {
  return News.find({})
    .skip((pageNumber - 1) * 20)
    .limit(20);
}

function getChannelNewsTotal(channelName) {
  return News.find({ channelName }).countDocuments();
}

function getNewsByChannelName(channelName, pageNumber) {
  return News.find({ channelName })
    .skip((pageNumber - 1) * 20)
    .limit(20);
}

module.exports = {
  getNews,
  getNewsByChannelName,
  getNewsTotal,
  getChannelNewsTotal,
  createNews: News => new News(News).save()
};

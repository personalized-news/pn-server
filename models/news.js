'use strict';

const { News } = require('../lib/mongo');

module.exports = {
  getNews: () => News.find({}),
  getNewsByChannelName: channelName => News.find({ channelName }),
  createNews: News => new News(News).save()
};

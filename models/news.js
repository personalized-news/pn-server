'use strict';

const { News } = require('../lib/mongo');

module.exports = {
  getNews: title => News.findOne({ title }),
  getNewsList: () => News.find({}),
  createNews: News => new News(News).save()
};

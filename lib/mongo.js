'use strict';

const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(
  config.mongodb,
  { useNewUrlParser: true }
);

const User = mongoose.model('User', {
  username: String,
  password: String
});

const News = mongoose.model('News', {
  allList: Array,
  id: String,
  content: String,
  havePic: Boolean,
  pubDate: String,
  title: String,
  source: String,
  imageurls: Array,
  channelName: String,
  link: String,
  desc: String,
  channelId: String
});

module.exports = {
  News,
  User
};

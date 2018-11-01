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
  title: String,
  content: String,
  date: String,
  tags: String
});

module.exports = {
  News,
  User
};

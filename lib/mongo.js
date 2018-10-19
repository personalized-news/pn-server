'use strict';

const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.mongodb);

const User = mongoose.model('User', {
  username: String,
  password: String
});

module.exports = User;

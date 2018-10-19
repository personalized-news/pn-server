'use strict';

const User = require('../lib/mongo');

module.exports = {
  getUsers: () => User.find({})
};

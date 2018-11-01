'use strict';

const { User } = require('../lib/mongo');

module.exports = {
  getUsers: () => User.find({}),
  getUserInfo: username => User.findOne({ username }),
  createUser: user => new User(user).save()
};

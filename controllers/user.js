'use strict';

const { getUsers } = require('../models/user');

const checkLogin = async (ctx, next) => {
  const { pass } = ctx.request.body;
  if(pass === '123') {
    ctx.body = await getUsers();//[...data];
  } else {
    ctx.body = 'Wrong password';
  }
};

module.exports = {
  checkLogin
};

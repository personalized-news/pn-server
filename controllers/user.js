'use strict';

const data = require('../mock');

const checkLogin = async (ctx, next) => {
  const { pass } = ctx.request.body;
  if(pass === '123') {
    ctx.body = [...data];
  } else {
    ctx.body = 'Wrong password';
  }
};

module.exports = {
  checkLogin
};

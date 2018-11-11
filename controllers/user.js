'use strict';

const { getUserInfo, createUser } = require('../models/user');

const index = async (ctx, next) => {
  if (ctx.session && ctx.session.username) {
    const userInfo = await getUserInfo(ctx.session.username);
    ctx.body = userInfo;
  } else {
    ctx.body = {
      code: 1,
      message: 'Not login'
    };
  }
};

const signup = async (ctx, next) => {
  const { username, password, repassword } = ctx.request.body;
  const userInfo = await getUserInfo(username);
  if (userInfo !== null) {
    ctx.body = {
      code: 1,
      message: '用户名已存在'
    };
  } else {
    if (password === undefined) {
      ctx.body = {
        code: 1,
        message: '请输入密码'
      };
    } else if (password.trim() !== repassword.trim()) {
      ctx.body = {
        code: 1,
        message: '请确保两次输入密码相同'
      };
    } else {
      await createUser({ username, password });
      ctx.session.username = username;
      ctx.body = {
        code: 0,
        message: 'Succeed'
      };
    }
  }
};

const login = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (username !== undefined && password !== undefined) {
    const userInfo = await getUserInfo(username);
    if (userInfo === null) {
      ctx.body = {
        code: 1,
        message: '该账号不存在'
      };
    } else if (password.trim() !== userInfo.password) {
      ctx.body = {
        code: 1,
        message: '密码错误'
      };
    } else {
      ctx.session.username = username;
      ctx.body = {
        code: 0,
        message: '密码正确'
      };
    }
  }
};

const logout = async (ctx, next) => {
  ctx.session = null;
  ctx.body = {
    code: 0,
    message: '登出成功'
  };
};

module.exports = {
  index,
  signup,
  login,
  logout
};

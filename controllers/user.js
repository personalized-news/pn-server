'use strict';

const { getUserInfo, createUser } = require('../models/user');

const index = async (ctx, next) => {
  if (ctx.session.username) {
    const userInfo = await getUserInfo(username);
    ctx.body = userInfo;
  } else {
    ctx.body = {
      status: 200,
      message: 'Not login'
    };
  }
};

const signup = async (ctx, next) => {
  const { username, password, repassword } = ctx.request.body;
  const userInfo = await getUserInfo(username);
  if (userInfo !== null) {
    ctx.body = {
      status: 0,
      message: '用户名已存在'
    };
  } else {
    if (userInfo === null && password === undefined) {
      ctx.body = {
        status: 0,
        message: '用户名未存在'
      };
    } else if (password.trim() !== repassword.trim()) {
      ctx.body = {
        status: 0,
        message: '请确保两次输入密码相同'
      };
    } else {
      await createUser({ username, password });
      ctx.session.username = username;
      ctx.body = {
        status: 200,
        message: '注册成功'
      };
    }
  }
};

const login = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (username !== undefined && password === undefined) {
    const userInfo = await getUserInfo(username);
    if (userInfo === null) {
      ctx.body = {
        status: 0,
        message: '该账号不存在'
      };
      return;
    } else {
      ctx.body = {
        status: 200,
        message: '该账号存在'
      };
      return;
    }
  } else if (username !== undefined && password !== undefined) {
    const userInfo = await getUserInfo(username);
    if (userInfo === null) {
      ctx.body = {
        status: 0,
        message: '该账号不存在'
      };
      return;
    } else if (password !== userInfo.password) {
      ctx.body = {
        status: 0,
        message: '密码错误'
      };
      return;
    } else {
      ctx.body = {
        status: 200,
        message: '密码正确'
      };
      return;
    }
  }
};

const logout = async (ctx, next) => {
  ctx.session = null;
};

module.exports = {
  index,
  signup,
  login,
  logout
};

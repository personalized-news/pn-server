'use strict';

const { getUserInfo, createUser } = require('../models/user');

const index = async (ctx, next) => {
  ctx.body = 'User page';
};

const signup = async (ctx, next) => {
  console.log(ctx.request.body);
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
  if (password === undefined) {
    ctx.body = {
      status: 0,
      message: '请输入密码'
    };
    return;
  }
  const userInfo = await getUserInfo(username);
  if (userInfo === null) {
    ctx.body = {
      status: 0,
      message: '此用户不存在'
    };
  } else if (userInfo.password !== password.trim()) {
    ctx.body = {
      status: 0,
      message: '密码不正确'
    };
  } else {
    ctx.session.username = username;
    ctx.body = {
      status: 200,
      message: '登录成功'
    };
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

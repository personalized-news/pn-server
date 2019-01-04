'use strict';
const jwt = require('jsonwebtoken');

const { getUserInfo, createUser } = require('../models/user');

// client中没有这个url -> /user
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
      // 每次登陆的时候,如果没有token就返回一个新的token
      ctx.session.token = ctx.session.token ? ctx.session.token : getToken();
      ctx.body = {
        code: 0,
        message: '密码正确',
        token: ctx.session.token
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

const getToken = function() {
  const token = jwt.sign(
    {
      data: 'foobar'
    },
    'secret',
    { expiresIn: 10 }
  );
  return token;
};

const checkToken = function(token) {
  try {
    const decoded = jwt.verify(token, 'secret');
    console.log('vaild token', decoded);
    return true;
  } catch (e) {
    console.log('invalid token'); // token过期
    return false;
  }
};

module.exports = {
  index,
  signup,
  login,
  logout,
  checkToken
};

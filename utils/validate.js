'use strict';

const isPhone = phone => {
  const re = /^1[34578]\d{9}$/;
  return re.test(phone);
};

module.exports = {
  isPhone
};

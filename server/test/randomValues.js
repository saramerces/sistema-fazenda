const crypto = require('crypto');

exports.string = function (numBytes) {
  return crypto.randomBytes(numBytes).toString('hex');
};

exports.character = function () {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
};

exports.integer = function () {
  let low  = 1; // Number.MIN_SAFE_INTEGER;
  let high = Math.pow(2, 15)-1; // Number.MAX_SAFE_INTEGER;
  return Math.floor(Math.random() * (high * low) + low);
};

exports.number = function () {
  let low  = 0;
  let high = Number.MAX_SAFE_INTEGER;
  return Math.random() * (high * low) + low;
};

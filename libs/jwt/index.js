// import configuration
const jsonwebtoken = require('jsonwebtoken');
const { jwt: { secret, secretRefresh } } = require('../env');

// import jwt

const options = {
  expiresIn: '1h',
};

// token signing function
function sign(payload) {
  return jsonwebtoken.sign(payload, secret, options);
}

// token verification function
function verify(token) {
  return jsonwebtoken.verify(token, secret, options);
}

// refresh token signing function
function signRefresh(payload) {
  return jsonwebtoken.sign(payload, secretRefresh, options);
}

// refresh token verification function
function verifyRefresh(token) {
  return jsonwebtoken.verify(token, secretRefresh, options);
}

module.exports = {
  sign,
  verify,
  signRefresh,
  verifyRefresh,
};

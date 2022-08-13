// import dependencies
const jwt = require('../libs/jwt');
const response = require('../libs/response');
const wrap = require('../libs/wrap');

// import constant
const { CODE, MESSAGE } = require('../libs/constant');

// bearer with jwt middleware authorization
const bearerAuthorization = (req, res, next) => {
  // read from 'authorization' header
  let token = req.headers.authorization;

  // if token not found
  if (!token) {
    const error = wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
    return response.send(res, error);
  }

  // trim 'Bearer ' from token
  if (String(token).startsWith('Bearer ')) {
    token = token.substring(7, token.length);
  }

  try {
    // coba validate token
    const decoded = jwt.verify(token);

    // inject decoded data to request object
    req.user = decoded;
    return next();
  } catch (err) {
    // if token is invalid
    const error = wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
    return response.send(res, error);
  }
};

module.exports = bearerAuthorization;

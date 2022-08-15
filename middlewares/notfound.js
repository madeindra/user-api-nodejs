// import dependencies
const response = require('../libs/response');
const wrap = require('../libs/wrap');

// import constant
const { CODE, MESSAGE } = require('../libs/constant');

// not found middleware
// eslint-disable-next-line no-unused-vars
function notfoundMiddleware(_req, res, _next) {
  const error = wrap.result(CODE.NOT_FOUND, MESSAGE.ROUTE_NOT_FOUND);
  return response.send(res, error);
}

module.exports = notfoundMiddleware;

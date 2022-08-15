// import dependencies
const response = require('../libs/response');
const wrap = require('../libs/wrap');

// import constant
const { CODE, MESSAGE } = require('../libs/constant');

// error middleware
// eslint-disable-next-line no-unused-vars
function errorMiddleware(_err, _req, res, _next) {
  const error = wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.ERROR);
  return response.send(res, error);
}

module.exports = errorMiddleware;

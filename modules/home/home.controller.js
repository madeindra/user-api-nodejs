// import dependencies
const wrap = require('../../libs/wrap');
const response = require('../../libs/response');
const { CODE, MESSAGE } = require('../../libs/constant');

// ping handler
function ping(req, res) {
  const result = wrap.result(CODE.OK, MESSAGE.SERVER_OK);
  return response.send(res, result);
}

module.exports = {
  ping,
};

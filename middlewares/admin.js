// import dependencies
const response = require('../libs/response');
const wrap = require('../libs/wrap');

// import constant
const { CODE, MESSAGE, ROLES } = require('../libs/constant');

// read from user data, user must be filled by bearer middleware
function adminOnly(req, res, next) {
  // read from 'authorization' header
  const { user } = req;

  // check if user does not have admin role
  if (!user?.role.includes(ROLES.ADMIN)) {
    const error = wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
    return response.send(res, error);
  }

  // pass to the next middleware / controller
  return next();
}

module.exports = adminOnly;

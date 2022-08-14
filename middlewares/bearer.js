// import dependencies
const jwt = require('../libs/jwt');
const response = require('../libs/response');
const wrap = require('../libs/wrap');
const repositoryUser = require('../modules/users/users.repositories');

// import constant
const { CODE, MESSAGE } = require('../libs/constant');

// bearer with jwt middleware authorization
async function bearerAuthorization(req, res, next) {
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
    // validate token
    const decoded = jwt.verify(token);

    // deconstruct
    const { id } = decoded;
    if (!id) {
      const error = wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
      return response.send(res, error);
    }

    // make sure user exist
    const user = await repositoryUser.findOne({ _id: id, isDeleted: false });
    if (!user) {
      const error = wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
      return response.send(res, error);
    }

    // inject latest user data to request object
    req.user = user;
    return next();
  } catch (err) {
    // if token is invalid
    const error = wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
    return response.send(res, error);
  }
}

module.exports = bearerAuthorization;

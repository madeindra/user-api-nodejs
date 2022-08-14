// import dependencies
const repositoryToken = require('./tokens.repositories');
const validation = require('./tokens.validations');
const repositoryUser = require('../users/users.repositories');
const jwt = require('../../libs/jwt');
const uuid = require('../../libs/uuid');
const wrap = require('../../libs/wrap');

// import constant
const { CODE, MESSAGE } = require('../../libs/constant');

async function refresh(body, user) {
  // deconstruct
  const { id } = user;

  // check if id exist
  if (!id) {
    throw wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
  }

  // deconstruct
  const { refreshToken } = body;

  // validate body
  const { error } = validation.refresh.validate({ refreshToken });
  if (error) {
    throw wrap.result(CODE.BAD_REQUEST, MESSAGE.BAD_REQUEST);
  }

  // check if refresh token is blacklisted
  let existingToken;
  try {
    existingToken = await repositoryToken.findOne({ token: refreshToken });
  } catch (err) {
    throw wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
  }

  // if exist in blacklist
  if (existingToken?.isInvalid) {
    throw wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
  }

  // validate
  try {
    jwt.verifyRefresh(refreshToken);
  } catch (err) {
    throw wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
  }

  // get latest user
  let existingUser;
  try {
    existingUser = await repositoryUser.findOne({ _id: id });
  } catch (err) {
    throw wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.DATABASE_FAILED);
  }

  if (!existingUser) {
    throw wrap.result(CODE.UNAUTHORIZED, MESSAGE.CREDENTIAL_INVALID);
  }

  // deconstruct user data
  const {
    _id, email, username, roles, isDeleted, isVerified, createdAt, updatedAt,
  } = existingUser;

  // create payload
  const payload = {
    id: _id,
    email,
    username,
    roles,
    isDeleted,
    isVerified,
    createdAt,
    updatedAt,
  };

  // invalidate old refresh token
  const invalidToken = {
    _id: uuid.generate(),
    token: refreshToken,
    isInvalid: true,
    invalidatedAt: new Date(),
  };

  // add to db
  try {
    await repositoryToken.insertOne({ ...invalidToken });
  } catch (err) {
    throw wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.DATABASE_FAILED);
  }

  // use same user data object as payload
  const token = jwt.sign({ ...payload });
  const newRefresh = jwt.signRefresh({ ...payload });

  // return response
  return wrap.result(CODE.OK, MESSAGE.GENERAL, { ...payload, token, refreshToken: newRefresh });
}

module.exports = {
  refresh,
};

// import dependencies
const repository = require('./tokens.repositories');
const validation = require('./tokens.validations');
const jwt = require('../../libs/jwt');
const uuid = require('../../libs/uuid');
const wrap = require('../../libs/wrap');

// import constant
const { CODE, MESSAGE } = require('../../libs/constant');

async function refresh(body) {
  // deconstruct
  const { refreshToken } = body;

  // validate body
  const { error } = validation.refresh.validate({ refreshToken });
  if (error) {
    throw wrap.result(CODE.BAD_REQUEST, MESSAGE.BAD_REQUEST);
  }

  // check if refresh token is blacklisted
  let existing;
  try {
    existing = await repository.findOne({ token: refreshToken });
  } catch (err) {
    throw wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
  }

  // if exist in blacklist
  if (existing?.isInvalid) {
    throw wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
  }

  // validate
  let payload;
  try {
    payload = jwt.verifyRefresh(refreshToken);
  } catch (err) {
    throw wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
  }

  // invalidate old refresh token
  const invalidToken = {
    _id: uuid.generate(),
    token: refreshToken,
    isInvalid: true,
    invalidatedAt: new Date(),
  };

  // add to db
  try {
    await repository.insertOne({ ...invalidToken });
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

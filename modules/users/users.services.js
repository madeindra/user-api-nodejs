// import dependencies
const repository = require('./users.repositories');
const validation = require('./user.validations');
const crypt = require('../../libs/crypt');
const jwt = require('../../libs/jwt');
const uuid = require('../../libs/uuid');
const wrap = require('../../libs/wrap');

// import constant
const { ROLES, CODE, MESSAGE } = require('../../libs/constant');

async function register(body) {
  // deconstruct
  const { username, email, password } = body;

  // validate body
  const { error } = validation.register.validate({ username, email, password });
  if (error) {
    throw wrap.result(CODE.BAD_REQUEST, MESSAGE.BAD_REQUEST);
  }

  // check if email exist
  if (!email) {
    throw wrap.result(CODE.BAD_REQUEST, MESSAGE.EMAIL_INVALID);
  }

  let existing;
  try {
    existing = await repository.findOne({ email });
  } catch (err) {
    throw wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.DATABASE_FAILED);
  }

  if (existing) {
    throw wrap.result(CODE.CONFLICT, MESSAGE.EMAIL_REGISTERED);
  }

  // check if username taken
  if (username) {
    try {
      existing = await repository.findOne({ username });
    } catch (err) {
      throw wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.DATABASE_FAILED);
    }
  }

  if (existing) {
    throw wrap.result(CODE.CONFLICT, MESSAGE.USERNAME_TAKEN);
  }

  // create user
  const newUser = {
    _id: uuid.generate(),
    email,
    username,
    roles: [ROLES.USER],
    password: await crypt.hash(password),
    isDeleted: false,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // add to db
  try {
    await repository.insertOne({ ...newUser });
  } catch (err) {
    throw wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.DATABASE_FAILED);
  }

  // return response
  return wrap.result(CODE.CREATED, MESSAGE.REGISTRATION_SUCCESS);
}

async function login(body) {
  // deconstruct
  const { email, password } = body;

  // validate body
  const { error } = validation.login.validate({ email, password });
  if (error) {
    throw wrap.result(CODE.BAD_REQUEST, MESSAGE.BAD_REQUEST);
  }

  // check if email exist
  if (!email) {
    throw wrap.result(CODE.BAD_REQUEST, MESSAGE.EMAIL_INVALID);
  }

  let existing;
  try {
    existing = await repository.findOne({ email });
  } catch (err) {
    throw wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.DATABASE_FAILED);
  }

  if (!existing) {
    throw wrap.result(CODE.UNAUTHORIZED, MESSAGE.CREDENTIAL_INVALID);
  }

  // deconstruct user data
  const {
    _id, username, roles, isDeleted, isVerified, createdAt, updatedAt, password: hashed,
  } = existing;

  // compare hash
  const isMatch = await crypt.compare(password, hashed);
  if (!isMatch) {
    throw wrap.result(CODE.UNAUTHORIZED, MESSAGE.CREDENTIAL_INVALID);
  }

  // create token
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

  const token = jwt.sign({ ...payload });
  const refreshToken = jwt.signRefresh({ ...payload });

  // return response
  return wrap.result(CODE.OK, MESSAGE.LOGIN_SUCCESS, { ...payload, token, refreshToken });
}

module.exports = {
  register,
  login,
};

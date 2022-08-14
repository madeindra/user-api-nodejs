/* eslint-disable no-underscore-dangle */
// import dependencies
const repository = require('./users.repositories');
const validation = require('./users.validations');
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
  const { username, password } = body;

  // validate body
  const { error } = validation.login.validate({ username, password });
  if (error) {
    throw wrap.result(CODE.BAD_REQUEST, MESSAGE.BAD_REQUEST);
  }

  // check if username exist
  if (!username) {
    throw wrap.result(CODE.BAD_REQUEST, MESSAGE.CREDENTIAL_INVALID);
  }

  let existing;
  try {
    existing = await repository.findOne({ username });
  } catch (err) {
    throw wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.DATABASE_FAILED);
  }

  if (!existing) {
    throw wrap.result(CODE.UNAUTHORIZED, MESSAGE.CREDENTIAL_INVALID);
  }

  // deconstruct user data
  const {
    _id, email, roles, isDeleted, isVerified, createdAt, updatedAt, password: hashed,
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

async function getProfile(user) {
  // deconstruct
  const { id } = user;

  // check if id exist
  if (!id) {
    throw wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
  }

  // get latest data
  let existing;
  try {
    existing = await repository.findOne({ _id: id });
  } catch (err) {
    throw wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.DATABASE_FAILED);
  }

  if (!existing) {
    throw wrap.result(CODE.UNAUTHORIZED, MESSAGE.CREDENTIAL_INVALID);
  }

  // deconstruct user data
  const {
    _id, email, username, roles, isDeleted, isVerified, createdAt, updatedAt,
  } = existing;

  // create response
  const response = {
    id: _id,
    email,
    username,
    roles,
    isDeleted,
    isVerified,
    createdAt,
    updatedAt,
  };

  // return response
  return wrap.result(CODE.OK, MESSAGE.GENERAL, response);
}

async function createUser(body) {
  // deconstruct
  const {
    username, email, password, roles,
  } = body;

  // validate body
  const { error } = validation.create.validate({
    username, email, password, roles,
  });

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
  const now = new Date();
  const newUser = {
    _id: uuid.generate(),
    username,
    email,
    password: await crypt.hash(password),
    roles: roles || [ROLES.USER],
    isDeleted: false,
    isVerified: true,
    createdAt: now,
    updatedAt: now,
  };

  // add to db
  try {
    await repository.insertOne({ ...newUser });
  } catch (err) {
    throw wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.DATABASE_FAILED);
  }

  // change field name & obscure confidential info
  newUser.id = newUser._id;
  newUser.password = 'PASSWORD REDACTED';
  delete newUser._id;

  // return response
  return wrap.result(CODE.CREATED, MESSAGE.GENERAL, newUser);
}

async function updateUser(id, body) {
  // check if id exist
  if (!id) {
    throw wrap.result(CODE.BAD_REQUEST, MESSAGE.BAD_REQUEST);
  }

  // deconstruct
  const {
    username, email, password, roles, isDeleted, isVerified,
  } = body;

  // validate body
  const { error } = validation.update.validate({
    id, username, email, password, roles, isDeleted, isVerified,
  });

  if (error) {
    throw wrap.result(CODE.BAD_REQUEST, MESSAGE.BAD_REQUEST);
  }

  // check existing user
  let currentData;
  try {
    currentData = await repository.findOne({ _id: id });
  } catch (err) {
    throw wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.DATABASE_FAILED);
  }

  // if not exist, return error
  if (!currentData) {
    throw wrap.result(CODE.NOT_FOUND, MESSAGE.USER_NOT_EXIST);
  }

  // deconstruct
  const { email: currentEmail, username: currentUsername } = currentData;

  // check if email used by other
  let existing;

  if (email !== currentEmail) {
    try {
      existing = await repository.findOne({ _id: { $ne: id }, email });
    } catch (err) {
      throw wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.DATABASE_FAILED);
    }

    if (existing) {
      throw wrap.result(CODE.CONFLICT, MESSAGE.EMAIL_REGISTERED);
    }
  }

  // check if username used by other
  if (username !== currentUsername) {
    try {
      existing = await repository.findOne({ _id: { $ne: id }, username });
    } catch (err) {
      throw wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.DATABASE_FAILED);
    }

    if (existing) {
      throw wrap.result(CODE.CONFLICT, MESSAGE.USERNAME_TAKEN);
    }
  }

  // create update
  const updateData = { updatedAt: new Date() };

  if (username) {
    updateData.username = username;
  }

  if (email) {
    updateData.email = email;
  }

  if (password) {
    updateData.password = await crypt.hash(password);
  }

  if (roles) {
    updateData.roles = roles;
  }

  if (typeof isDeleted === 'boolean') {
    updateData.isDeleted = isDeleted;
  }

  if (typeof isVerified === 'boolean') {
    updateData.isVerified = isVerified;
  }

  // update in db
  try {
    await repository.updateOne({ _id: id }, { $set: { ...updateData } });
  } catch (err) {
    throw wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.DATABASE_FAILED);
  }

  // change field name & obscure confidential info
  const updated = { ...currentData, ...updateData };
  updated.id = id;
  updated.password = 'PASSWORD REDACTED';
  delete updated._id;

  // return response
  return wrap.result(CODE.OK, MESSAGE.GENERAL, updated);
}

module.exports = {
  register,
  login,
  getProfile,
  createUser,
  updateUser,
};

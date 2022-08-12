// import dependencies
const repository = require('./users.repositories');
const crypt = require('../../libs/crypt');
const jwt = require('../../libs/jwt');
const uuid = require('../../libs/uuid');

// import constant
const { roles: { user, admin } } = require('../../libs/constant');

async function register(data) {
  // deconstruct
  const { username, email, password } = data;

  // check if email exist
  if (!email) {
    throw new Error('Invalid email.');
  }

  let existing;
  try {
    existing = await repository.findOne({ email });
  } catch (err) {
    throw new Error('Database operation failed.')
  }

  if (existing) {
    throw new Error('Email already registered.');
  }

  // create user
  const newUser = {
    email,
    username,
    id: uuid.generate(),
    roles: [user],
    password: await crypt.hash(password),
    isDeleted: false,
    isVerified: true,
  };

  // add to db
  let result;
  try {
    result = await repository.insertOne({ ...newUser });
  } catch (err) {
    throw new Error('Database operation failed.')
  }

  // return response
  return result;
}

async function login(data) {
  // deconstruct
  const { email, password } = data;

  // check if email exist
  if (!email) {
    throw new Error('Invalid email.');
  }

  let existing;
  try {
    existing = await repository.findOne({ email }, { _id: 0 });
  } catch (err) {
    throw new Error('Database operation failed.')
  }

  if (!existing) {
    throw new Error('User does not exist.');
  }

  const { id, username, roles, isDeleted, isVerified, password: hashed } = existing;

  // compare hash
  const isMatch = await crypt.compare(password, hashed);
  if (!isMatch) {
    throw new Error('Invalid password.')
  }

  // create token
  const payload = {
    id,
    email,
    username,
    roles,
    isDeleted,
    isVerified,
  };

  const token = jwt.sign({ ...payload });

  // return response
  return {
    ...payload,
    token,
  };
}

module.exports = {
  register,
  login,
};
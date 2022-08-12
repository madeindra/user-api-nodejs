// import dependencies
const repository = require('./users.repositories');
const jwt = require('../../libs/jwt');
const crypt = require('../../libs/crypt');
const uuid = require('../../libs/uuid');

async function register(object) {
  // check if email exist
  if (!object.email) {
    throw new Error('Invalid email.');
  }

  let existing;
  try {
    existing = await repository.findOne({ email: object.email });
  } catch(err) {
    throw new Error('Database operation failed.')
  }

  if (existing) {
    throw new Error('Email already registered.');
  }

  // hash password
  object.userId = uuid.generate();
  object.password = await crypt.hash(object.password);

  // add to db
  let result;
  try {
    result = await repository.insertOne({ ...object });
  } catch(err) {
    throw new Error('Database operation failed.')
  }

  // return response
  return result;
}

async function login(object) {
  // check if email exist
  if (!object.email) {
    throw new Error('Invalid email.');
  }

  let existing;
  try {
    existing = await repository.findOne({ email: object.email }, { _id: 0 });
  } catch(err) {
    throw new Error('Database operation failed.')
  }

  if (!existing) {
    throw new Error('User does not exist.');
  }

  // compare hash
  const isMatch = await crypt.compare(object.password, existing.password);
  if (!isMatch){
    throw new Error('Invalid password.')
  }

  // create token
  const payload = {
    username: object.username,
    email: object.email,
    roles: object.roles,
    isDeleted: object.isDeleted,
    isVerified: object.isVerified,
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
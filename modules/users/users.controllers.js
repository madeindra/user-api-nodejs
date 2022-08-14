// import dependencies
const service = require('./users.services');
const response = require('../../libs/response');

async function register(req, res) {
  // deconstruct body
  const { body } = req;

  // pass to service
  let result;
  try {
    result = await service.register(body);
  } catch (err) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function login(req, res) {
  // deconstruct body
  const { body } = req;

  // pass to service
  let result;
  try {
    result = await service.login(body);
  } catch (err) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function getProfile(req, res) {
  // deconstruct body from bearer middleware
  const { user } = req;

  // pass to service
  let result;
  try {
    result = await service.getProfile(user);
  } catch (err) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function createUser(req, res) {
  // deconstruct body
  const { body } = req;

  // pass to service
  let result;
  try {
    result = await service.createUser(body);
  } catch (err) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function readAllUsers(req, res) {
  // deconstruct param & query
  const { query } = req;

  // pass to service
  let result;
  try {
    result = await service.readAllUsers(query);
  } catch (err) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function readOneUser(req, res) {
  // deconstruct param
  const { params: { id } } = req;

  // pass to service
  let result;
  try {
    result = await service.readOneUser(id);
  } catch (err) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function updateUser(req, res) {
  // deconstruct param & body
  const { params: { id }, body } = req;

  // pass to service
  let result;
  try {
    result = await service.updateUser(id, body);
  } catch (err) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

async function deleteUser(req, res) {
  // deconstruct param
  const { params: { id } } = req;

  // pass to service
  let result;
  try {
    result = await service.deleteUser(id);
  } catch (err) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

module.exports = {
  register,
  login,
  getProfile,
  createUser,
  readAllUsers,
  readOneUser,
  updateUser,
  deleteUser,
};

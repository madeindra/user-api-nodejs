// import dependencies
const service = require('./users.services');
const response = require('../../libs/response');

async function register(req, res) {
  // deconstruct body
  const { body } = req;

  // pass to service
  let result
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
  let result
  try {
    result = await service.login(body);
  } catch (err) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

module.exports = {
  register,
  login,
};
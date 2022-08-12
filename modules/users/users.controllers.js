// import dependencies
const service = require('./users.services');
const schema = require('./user.schemas');

// import constant
const { roles: admin } = require('../../libs/constant');

async function registerUser(req, res) {
  // deconstruct body
  const { body } = req;

  // validate body
  const { error, value } = schema.register.validate(body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error?.details[0]?.message || 'Bad request.',
    });
  }

  // pass to service
  let result
  try {
    result = await service.register(value);
  } catch(err) {
    return res.status(500).json({
      success: false,
      message: err.toString(),
    });
  }

  // return result
  return res.status(200).json(result);
}

async function registerAdmin(req, res) {
  // deconstruct body
  const { body } = req;

  // validate body
  const { error, value } = schema.register.validate(body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error?.details[0]?.message || 'Bad request.',
    });
  }

  // add roles
  value.roles.push(admin);

  // pass to service
  let result
  try {
    result = await service.register(value);
  } catch(err) {
    return res.status(500).json({
      success: false,
      message: err.toString(),
    });
  }

  // return result
  return res.status(200).json(result);
}

async function login(req, res) {
  // deconstruct body
  const { body } = req;

  // validate body
  const { error, value } = schema.login.validate(body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error?.details[0]?.message || 'Bad request.',
    });
  }

  // pass to service
  let result
  try {
    result = await service.login(value);
  } catch(err) {
    return res.status(500).json({
      success: false,
      message: err.toString(),
    });
  }

  // return result
  return res.status(200).json(result);
}

module.exports = {
  registerUser,
  registerAdmin,
  login,
};
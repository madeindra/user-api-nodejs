// import dependencies
const service = require('./users.services');
const validation = require('./user.validations');

async function register(req, res) {
  // deconstruct body
  const { body } = req;

  // validate body
  const { error, value } = validation.register.validate(body);
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
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.toString(),
    });
  }

  // return result
  return res.status(200).json({
    success: true,
    message: 'Registration successful.'
  });
}

async function login(req, res) {
  // deconstruct body
  const { body } = req;

  // validate body
  const { error, value } = validation.login.validate(body);
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
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.toString(),
    });
  }

  // return result
  return res.status(200).json(result);
}

module.exports = {
  register,
  login,
};
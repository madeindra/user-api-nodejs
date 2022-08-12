// import dependencies
const joi = require('joi');

// import constant
const { roles: user } = require('../../libs/constant');

const register = joi.object({
  username: joi.string().optional().allow(null).default(null),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  roles: joi.array().forbidden().default([ user ]),
  isDeleted: joi.boolean().forbidden().default(false),
  isVerified: joi.boolean().forbidden().default(false),
});

const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports = {
  register,
  login,
};
// import dependencies
const joi = require('joi').extend(require('@joi/date'));

// import constant
const { ROLES } = require('../../libs/constant');

const register = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const login = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

const create = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  roles: joi.array().optional().items(joi.string().valid(ROLES.USER, ROLES.ADMIN)),
});

const update = joi.object({
  id: joi.string().uuid().optional(),
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  roles: joi.array().required().items(joi.string().valid(ROLES.USER, ROLES.ADMIN)),
  isDeleted: joi.boolean().required(),
  isVerified: joi.boolean().required(),
});

module.exports = {
  register,
  login,
  create,
  update,
};

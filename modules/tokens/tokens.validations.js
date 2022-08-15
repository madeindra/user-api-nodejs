// import dependencies
const joi = require('joi');

const refresh = joi.object({
  refreshToken: joi.string().required(),
});

module.exports = {
  refresh,
};

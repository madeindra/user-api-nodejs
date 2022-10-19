// import dependencies
import joi from 'joi';

const refresh = joi.object({
  refreshToken: joi.string().required(),
});

export default {
  refresh,
};

// import dependencies
const service = require('./tokens.services');
const response = require('../../libs/response');

async function refresh(req, res) {
  // deconstruct body & user from token
  const { body, user } = req;

  // pass to service
  let result;
  try {
    result = await service.refresh(body, user);
  } catch (err) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

module.exports = {
  refresh,
};

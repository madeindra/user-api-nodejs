// import constant
const { CODE, MESSAGE  } = require("../constant");

// response send function
function send(res, result = {}) {
  // deconstruct result
  const { data } = result;
  let { code, message } = result;

  //set default code
  if (!code) {
    code = CODE.INTERNAL_SERVER_ERROR;
  }

  // set default message
  if (!message) {
    message = MESSAGE.FAILED;
  }

  // return response
  return res.status(code).json({
    // http status code 4XX-5XX for error
    success: code < 400,
    message,
    data,
  });
}

module.exports = {
  send,
}
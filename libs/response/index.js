// response send function
function send(res, result) {
  // deconstruct result
  const { code, message, data } = result;

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
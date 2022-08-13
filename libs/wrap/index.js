// service result wrapper
function result(code, message, data) {
  // wrap as an object
  return {
    code,
    message,
    data,
  }
}

module.exports = {
  result,
}
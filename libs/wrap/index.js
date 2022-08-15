// service result wrapper
function result(code, message, data, meta) {
  // wrap as an object
  return {
    code,
    message,
    data,
    meta,
  };
}

module.exports = {
  result,
};

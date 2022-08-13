// error middleware
// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  return res.status(500).json({
    success: false,
    message: 'An error occured.',
  });
}

module.exports = errorMiddleware;

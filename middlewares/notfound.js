// not found middleware
function notfoundMiddleware(req, res, next) {
  return res.status(404).json({
    success: false,
    message: 'Route not found.'
  });
}

module.exports = notfoundMiddleware;

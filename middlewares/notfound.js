// not found middleware
// eslint-disable-next-line no-unused-vars
function notfoundMiddleware(_req, res, _next) {
  return res.status(404).json({
    success: false,
    message: 'Route not found.',
  });
}

module.exports = notfoundMiddleware;

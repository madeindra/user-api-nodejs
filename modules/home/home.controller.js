// ping handler
function ping(req, res) {
  return res.status(200).json({
    success: true,
    message: 'Server is operating properly.' 
  });
}

module.exports = {
  ping
}
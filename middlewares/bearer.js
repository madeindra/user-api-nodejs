// import dependencies
const jwt = require('../libs/jwt');

// bearer with jwt middleware authorization
const bearerAuthorization = (req, res, next) => {
  // read from 'authorization' header
  let token = req.headers['authorization'];

  // if token not found
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized access.',
    });
  }

  // trim 'Bearer ' from token
  if (String(token).startsWith('Bearer ')) {
    token = token.substring(7, token.length);
  }

  try {
    // coba validate token
    const decoded = jwt.verify(token);

    // inject decoded data to request object
    req.user = decoded;
    next();
  } catch (err) {
    // if token is invalid
    return res.status(401).json({
      message: 'Unauthorized access.',
    });
  }
}

module.exports = bearerAuthorization;

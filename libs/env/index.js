// initiate env
require('dotenv').config();

// general configurations
const conf = Object.freeze({
  mode: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '8000',
});

// db configurations
const db = Object.freeze({
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  database: process.env.MONGO_DATABASE || 'database',
});

// jwt configurations
const jwt = Object.freeze({
  secret: process.env.JWT_SECRET || 'secret',
});

// crypt configuration
const crypt = Object.freeze({
  round: Number(process.env.CRYPT_ROUND) || 10,
});

module.exports = {
  conf,
  db,
  jwt,
  crypt,
}
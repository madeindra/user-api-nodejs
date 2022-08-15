// import configuration
const bcrypt = require('bcrypt');
const { crypt: { round } } = require('../env');

// import crypt

const hash = (plain) => bcrypt.hash(plain, round);
const compare = (plain, hashed) => bcrypt.compare(plain, hashed);

module.exports = {
  hash,
  compare,
};

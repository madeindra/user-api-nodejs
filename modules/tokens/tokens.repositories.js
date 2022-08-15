// import db
const db = require('../../libs/db');

// import constants
const { COLLECTION: { TOKENS } } = require('../../libs/constant');

function insertOne(document, options) {
  return db.insertOne(TOKENS, document, options);
}

function findOne(condition, options) {
  return db.findOne(TOKENS, condition, options);
}

// export functions
module.exports = {
  insertOne,
  findOne,
};

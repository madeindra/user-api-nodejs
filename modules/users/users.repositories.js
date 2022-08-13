// import db
const db = require('../../libs/db');

// import constants
const { COLLECTION: { USERS } } = require('../../libs/constant');

function insertOne(document, options) {
  return db.insertOne(USERS, document, options);
}

function findOne(condition, options) {
  return db.findOne(USERS, condition, options);
}

// export functions
module.exports = {
  insertOne,
  findOne,
};

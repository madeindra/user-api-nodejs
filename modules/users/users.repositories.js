// import db
const db = require('../../libs/db');

// import constants
const { collection: { users } } = require('../../libs/constant');

function insertOne(document, options) {
  return db.insertOne(users, document, options);
}

function findOne(condition, options) {
  return db.findOne(users, condition, options);
}

// export functions
module.exports = {
  insertOne,
  findOne,
}
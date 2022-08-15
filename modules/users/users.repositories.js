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

function findOffset(condition, options, sort, page, limit) {
  return db.findOffset(USERS, condition, options, sort, page, limit);
}

function updateOne(condition, updateDoc, options) {
  return db.updateOne(USERS, condition, updateDoc, options);
}

// export functions
module.exports = {
  insertOne,
  findOne,
  findOffset,
  updateOne,
};

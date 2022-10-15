// import configuration
const { MongoClient } = require('mongodb');
const { db } = require('../env');

// import dependencies

// set connection
let client;
let conn;

const transactionOptions = {
  readConcern: { level: 'snapshot' },
  writeConcern: { w: 'majority' },
  readPreference: 'primary',
};

// database init functions
async function init() {
  client = new MongoClient(db.uri);

  await client.connect();
  conn = client.db(db.database);
}

// database close functions
async function close() {
  return client.close();
}

// return database connection
function get() {
  return conn;
}

// inser one in collection
function insertOne(collection = '', document = {}, options = {}, session = null) {
  return conn.collection(collection).insertOne({ ...document }, { ...options, session });
}

// inser many in collection
function insertMany(collection = '', documents = [], options = {}, session = null) {
  return conn.collection(collection).insertMany([...documents], { ...options, session });
}

// find one in collection
function findOne(collection = '', condition = {}, options = {}, session = null) {
  return conn.collection(collection).findOne({ ...condition }, { ...options, session });
}

// find many in collection
function findMany(collection = '', condition = {}, options = {}, session = null) {
  return conn.collection(collection).find({ ...condition }, { ...options, session }).toArray();
}

// find with offset in collection
function findOffset(collection = '', condition = {}, options = {}, sort = { _id: 1 }, page = 1, limit = 10) {
  const offset = limit * (page - 1);
  return conn.collection(collection).find({ ...condition }, { ...options })
    .sort(sort).limit(limit)
    .skip(offset)
    .toArray();
}

// update one in collection
function updateOne(collection = '', condition = {}, updateDoc = {}, options = {}, session = null) {
  return conn.collection(collection)
    .updateOne({ ...condition }, { ...updateDoc }, { ...options, session });
}

// update many in collection
function updateMany(collection = '', condition = {}, updateDoc = {}, options = {}, session = null) {
  return conn.collection(collection)
    .updateMany({ ...condition }, { ...updateDoc }, { ...options, session });
}

// delete one in collection
function deleteOne(collection = '', condition = {}, options = {}, session = null) {
  return conn.collection(collection).deleteOne({ ...condition }, { ...options, session });
}

// delete many in collection
function deleteMany(collection = '', condition = {}, options = {}, session = null) {
  return conn.collection(collection).deleteMany({ ...condition }, { ...options, session });
}

// start session for transaction
function startSession() {
  return client.startSession();
}

// end session for transaction
function endSession(session) {
  return session.endSession();
}

// begin transaction
function startTransaction(session) {
  return session.startTransaction(transactionOptions);
}

// commit transaction
function commitTransaction(session) {
  return session.commitTransaction();
}

// rollback transaction
function abortTransaction(session) {
  return session.abortTransaction();
}

module.exports = {
  init,
  close,
  get,
  insertOne,
  insertMany,
  findOne,
  findMany,
  findOffset,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  startSession,
  endSession,
  startTransaction,
  commitTransaction,
  abortTransaction,
};

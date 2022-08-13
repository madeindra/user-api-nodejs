// import configuration
const { MongoClient } = require('mongodb');
const { db } = require('../env');

// import dependencies

// set connection
let client;
let conn;

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
function insertOne(collection = '', document = {}, options = {}) {
  return conn.collection(collection).insert({ ...document }, { ...options });
}

// inser many in collection
function insertMany(collection = '', documents = [], options = {}) {
  return conn.collection(collection).insertMany([...documents], { ...options });
}

// find one in collection
function findOne(collection = '', condition = {}, options = {}) {
  return conn.collection(collection).findOne({ ...condition }, { ...options });
}

// find many in collection
function findMany(collection = '', condition = {}, options = {}) {
  return conn.collection(collection).find({ ...condition }, { ...options });
}

// update one in collection
function updateOne(collection = '', condition = {}, updateDoc = {}, options = {}) {
  return conn.collection(collection).updateOne({ ...condition }, { ...updateDoc }, { ...options });
}

// update many in collection
function updateMany(collection = '', condition = {}, updateDoc = {}, options = {}) {
  return conn.collection(collection).updateMany({ ...condition }, { ...updateDoc }, { ...options });
}

// delete one in collection
function deleteOne(collection = '', condition = {}, options = {}) {
  return conn.collection(collection).deleteOne({ ...condition }, { ...options });
}

// delete many in collection
function deleteMany(collection = '', condition = {}, options = {}) {
  return conn.collection(collection).deleteMany({ ...condition }, { ...options });
}

module.exports = {
  init,
  close,
  get,
  insertOne,
  insertMany,
  findOne,
  findMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
};

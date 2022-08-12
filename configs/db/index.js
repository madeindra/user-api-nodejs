// import configuration
const { db } = require('../env');

// import dependencies
const { MongoClient } = require('mongodb');

// set connection
let client;
let dbConnection;

// database init functions
async function init()  {
  client = new MongoClient(db.uri)
  
  await client.connect();
  dbConnection = client.db(db.database);
}

// database close functions
async function close() {
  return client.close();
}

// return database connection
function get() {
  return dbConnection;
}

module.exports = {
  init,
  close,
  get,
}
// import db
import db from '../../libs/db';

// import constants
import { COLLECTION } from '../../libs/constant';

function insertOne(document: any, options?: any) {
  return db.insertOne(COLLECTION.USERS, document, options);
}

function findOne(condition: any, options?: any) {
  return db.findOne(COLLECTION.USERS, condition, options);
}

function findOffset(condition: any, options: any, sort: any, page: any, limit: any) {
  return db.findOffset(COLLECTION.USERS, condition, options, sort, page, limit);
}

function updateOne(condition: any, updateDoc: any, options?: any) {
  return db.updateOne(COLLECTION.USERS, condition, updateDoc, options);
}

// export functions
export default {
  insertOne,
  findOne,
  findOffset,
  updateOne,
};

// import db
import db from '../../libs/db';

// import constants
import { COLLECTION } from '../../libs/constant';

function insertOne(document: any, options?: any) {
  return db.insertOne(COLLECTION.TOKENS, document, options);
}

function findOne(condition: any, options?: any) {
  return db.findOne(COLLECTION.TOKENS, condition, options);
}

// export functions
export default {
  insertOne,
  findOne,
};

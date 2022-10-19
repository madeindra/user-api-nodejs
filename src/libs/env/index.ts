// import dependencies
import path from 'path';
import dotenv from 'dotenv';

// initiate env
dotenv.config({ path: path.join(__dirname, '/../../../.env') });

// general configurations
export const conf = Object.freeze({
  mode: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '8000',
});

// db configurations
export const db = Object.freeze({
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  database: process.env.MONGO_DATABASE || 'database',
});

// jwt configurations
export const jwt = Object.freeze({
  secret: process.env.JWT_SECRET || 'secret',
  secretRefresh: process.env.JWT_SECRET_REFRESH || 'refresh',
});

// crypt configuration
export const crypt = Object.freeze({
  round: Number(process.env.CRYPT_ROUND) || 10,
});

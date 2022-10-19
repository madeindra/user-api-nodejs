// import jwt
import jsonwebtoken, { SignOptions, VerifyOptions } from 'jsonwebtoken';

// import configuration
import { jwt } from '../env';

const signOptions: SignOptions = {
  expiresIn: '1h',
};

const verifyOptions: VerifyOptions = {};

// token signing function
function sign(payload: any): string {
  return jsonwebtoken.sign(payload, jwt.secret, signOptions);
}

// token verification function
function verify(token: string): any {
  return jsonwebtoken.verify(token, jwt.secret, verifyOptions);
}

// refresh token signing function
function signRefresh(payload: any): string {
  return jsonwebtoken.sign(payload, jwt.secretRefresh, signOptions);
}

// refresh token verification function
function verifyRefresh(token: string): any {
  return jsonwebtoken.verify(token, jwt.secretRefresh, verifyOptions);
}

export default {
  sign,
  verify,
  signRefresh,
  verifyRefresh,
};

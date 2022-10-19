// import type
import { Response, NextFunction } from 'express';
import { RequestUser } from '../libs/types';

// import dependencies
import response from '../libs/response';
import wrap from '../libs/wrap';

import jwt from '../libs/jwt';
import repositoryUser from '../modules/users/users.repositories';

// import constant
import { CODE, MESSAGE } from '../libs/constant';

// bearer with jwt middleware authorization
function bearerAuthorization(req: RequestUser, res: Response, next: NextFunction): void {
  // read from 'authorization' header
  let token = req.headers.authorization;

  // if token not found
  if (!token) {
    const error = wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
    response.send(res, error);
  }

  // trim 'Bearer ' from token
  token = String(token);
  if (token.startsWith('Bearer ')) {
    token = token.substring(7, token.length);
  }


  // validate token
  const decoded = jwt.verify(token);

  // deconstruct
  const { id } = decoded;
  if (!id) {
    const error = wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
    response.send(res, error);
  }

  // make sure user exist
  repositoryUser.findOne({ _id: id, isDeleted: false }).then((user: any) => {
    if (!user) {
      const error = wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
      response.send(res, error);
    }

    // inject latest user data to request object
    req.user = user;
    next();
  }).catch((err: Error) => {
    // if token is invalid
    const error = wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
    response.send(res, error);
  });
}

export default bearerAuthorization
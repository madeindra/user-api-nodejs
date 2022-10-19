// import type
import { Response, NextFunction } from 'express';
import { RequestUser } from '../libs/types';

// import dependencies
import response from '../libs/response';
import wrap from '../libs/wrap';

// import constant
import { CODE, MESSAGE, ROLES } from '../libs/constant';

// read from user data, user must be filled by bearer middleware
function adminOnly(req: RequestUser, res: Response, next: NextFunction): any {
  // read from 'authorization' header
  const { user } = req;

  // check if user does not have admin role
  if (!user?.roles.includes(ROLES.ADMIN)) {
    const error = wrap.result(CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED);
    return response.send(res, error);
  }

  // pass to the next middleware / controller
  return next();
}

export default adminOnly;

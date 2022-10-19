// import type
import { Request, Response } from 'express';

// import dependencies
import response from '../libs/response';
import wrap from '../libs/wrap';

// import constant
import { CODE, MESSAGE } from '../libs/constant';

// error middleware
// eslint-disable-next-line no-unused-vars
function errorMiddleware(_err: any, _req: Request, res: Response): any {
  const error = wrap.result(CODE.INTERNAL_SERVER_ERROR, MESSAGE.ERROR);
  return response.send(res, error);
}

export default errorMiddleware;

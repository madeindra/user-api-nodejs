// import type
import { Request, Response } from 'express';

// import dependencies
import response from '../libs/response';
import wrap from '../libs/wrap';

// import constant
import { CODE, MESSAGE } from '../libs/constant';

// not found middleware
// eslint-disable-next-line no-unused-vars
function notfoundMiddleware(_req: Request, res: Response) {
  const error = wrap.result(CODE.NOT_FOUND, MESSAGE.ROUTE_NOT_FOUND);
  return response.send(res, error);
}

export default notfoundMiddleware;

// import types
import { Request, Response } from 'express';

// import dependencies
import wrap from '../../libs/wrap';
import response from '../../libs/response';
import { CODE, MESSAGE } from '../../libs/constant';

// ping handler
function ping(_req: Request, res: Response) {
  const result = wrap.result(CODE.OK, MESSAGE.SERVER_OK);
  return response.send(res, result);
}

export default {
  ping,
};

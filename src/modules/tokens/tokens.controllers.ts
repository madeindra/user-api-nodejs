// import types
import { Request, Response } from 'express';

// import dependencies
import service from './tokens.services';
import response from '../../libs/response';

async function refresh(req: Request, res: Response) {
  // deconstruct body & user from token
  const { body } = req;

  // pass to service
  let result;
  try {
    result = await service.refresh(body);
  } catch (err: any) {
    return response.send(res, err);
  }

  // return result
  return response.send(res, result);
}

export default {
  refresh,
};

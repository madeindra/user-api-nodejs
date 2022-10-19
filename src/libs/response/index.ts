// import type
import { Response } from 'express';
import { Result } from '../types';

// import constant
import { CODE, MESSAGE } from '../constant';

// response send function
function send(res: Response, result: Result) {
  // deconstruct result
  const { data, meta } = result;
  let { code, message } = result;

  // set default code
  if (!code) {
    code = CODE.INTERNAL_SERVER_ERROR;
  }

  // set default message
  if (!message) {
    message = MESSAGE.FAILED;
  }

  // return response
  return res.status(code).json({
    // http status code 4XX-5XX for error
    success: code < 400,
    message,
    data,
    meta,
  });
}

export default {
  send,
};

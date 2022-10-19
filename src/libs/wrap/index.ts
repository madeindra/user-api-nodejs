// import types
import { Result } from '../types';

// service result wrapper
function result(code: number, message: string, data: any = null, meta: any = null): Result {
  // wrap as an object
  return {
    code,
    message,
    data,
    meta,
  };
}

export default {
  result,
};

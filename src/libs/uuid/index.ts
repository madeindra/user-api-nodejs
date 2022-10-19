// import uuid
import { v4 as uuid } from 'uuid';

function generate() {
  return uuid();
}

export default {
  generate,
};

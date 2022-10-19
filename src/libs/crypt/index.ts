// import bcrypt
import bcrypt from 'bcrypt';

// import configuration
import { crypt } from '../env';

const hash = (plain: string): Promise<string> => bcrypt.hash(plain, crypt.round);
const compare = (plain: string, hashed: string): Promise<boolean> => bcrypt.compare(plain, hashed);

export default {
  hash,
  compare,
};

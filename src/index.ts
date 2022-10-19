// import app
import server from './server';
import db from './libs/db';

// get port dinamically
import { conf } from './libs/env';

// run
const app = server.listen(conf.port);
db.init();

// graceful shutdown
process.on('SIGTERM', () => {
  db.close();
  app.close();
});

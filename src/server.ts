// import dependencies
import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pino from 'pino-http';

// import middlewares
import errorMiddleware from './middlewares/error';
import notfoundMiddleware from './middlewares/notfound';

// import routes
import routes from './routes';

// initialize server
const server: Express = express();

// setup middleware
server.use(cors()); // CORS, update in production
server.use(helmet()); // security
server.use(pino()); // logging middleware
server.use(express.json()); // json body parser

// implement routes
server.use('/', routes);

// setup error / not found catcher
server.use(errorMiddleware);
server.use(notfoundMiddleware);

// export http server
export default server;

// import dependencies
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const pino = require('pino-http');

// import middlewares
const errorMiddleware = require('./middlewares/error');
const notfoundMiddleware = require('./middlewares/notfound');

// import routes
const routes = require('./routes');

// initialize server
const app = express();

// setup middleware
app.use(cors()); // CORS, update in production
app.use(helmet()); // security
app.use(pino());  // logging middleware

// implement routes
app.use('/', routes);

// setup error / not found catcher
app.use(errorMiddleware);
app.use(notfoundMiddleware);

// export http server
module.exports = app;
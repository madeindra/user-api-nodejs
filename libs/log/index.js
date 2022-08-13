// import pino
const pino = require('pino');

function fatal(message, scope, data) {
  return pino.fatal({ scope, message, data });
}

function error(message, scope, data) {
  return pino.error({ scope, message, data });
}

function warn(message, scope, data) {
  return pino.warn({ scope, message, data });
}

function info(message, scope, data) {
  return pino.info({ scope, message, data });
}

function debug(message, scope, data) {
  return pino.debug({ scope, message, data });
}

function trace(message, scope, data) {
  return pino.trace({ scope, message, data });
}

module.exports = {
  fatal,
  error,
  warn,
  info,
  debug,
  trace,
};

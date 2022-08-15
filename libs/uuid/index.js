// import uuid
const { v4: uuid } = require('uuid');

function generate() {
  return uuid();
}

module.exports = {
  generate,
};

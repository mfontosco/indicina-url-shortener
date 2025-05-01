const crypto = require('crypto');


function generateShortId() {
  return crypto.randomBytes(4).toString('base64url').slice(0, 6);
}

module.exports = { generateShortId };

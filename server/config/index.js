require('dotenv').config();
const { ENVIRONMENT_VAR_UNDEFINED } = require('../constants/infoMessages');

if (process.env.DB_CONNECTION === undefined ||
  process.env.SENDER_EMAIL === undefined ||
  process.env.SENDER_PASSWORD === undefined ||
  process.env.RECIPIENT_EMAIL === undefined) {
  throw new Error(ENVIRONMENT_VAR_UNDEFINED);
}

const env = process.env.NODE_ENV;
const development = {
  app: {
    PORT: process.env.PORT || 4101,
  },
  db: {
    DB_CONNECTION: process.env.DB_CONNECTION,
  },
  services: {
    email: {
      sender: process.env.SENDER_EMAIL,
      senderPassword: process.env.SENDER_PASSWORD,
      recipient: process.env.RECIPIENT_EMAIL
    }
  },
};

const config = { development };

module.exports = config[env];
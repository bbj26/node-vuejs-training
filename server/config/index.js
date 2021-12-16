require('dotenv').config();
const _ = require('lodash');
const { ENVIRONMENT_VAR_UNDEFINED } = require('../constants/infoMessages');

const env = process.env.NODE_ENV;
const development = {
  app: {
    PORT: process.env.PORT,
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

const checkEnvironmentVarsExistance = (() => {
  const paths = [
    'app.PORT', 
    'db.DB_CONNECTION', 
    'services.email.sender',
    'services.email.senderPassword', 
    'services.email.recipient'
  ];
  paths.forEach(path => {
    if (_.get(config[env], path) === undefined) {
      throw new Error(`${path} ${ENVIRONMENT_VAR_UNDEFINED}`);
    }
  });
})();

module.exports = config[env];
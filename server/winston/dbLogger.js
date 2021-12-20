const { DB_CONNECTED } = require('../constants/infoMessages');
const logger = require('./index');

const logDbConnectionError = (error) => {
  logger.log('fatal', `Problem with connection to DB. Error: ${error.message}` +
    ` Details: ${error.stack}`);
};
const logDbConnectionSuccess = () => {
  logger.info(DB_CONNECTED);
};
module.exports = { logDbConnectionError, logDbConnectionSuccess };
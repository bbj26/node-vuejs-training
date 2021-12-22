const logger = require('./index');


const logServerError = (error) => {
  logger('fatal', `Server is down. Error: ${error.message}. Details: ` +
    `${error.stack}`);
};
const logServerRunning = (PORT) => {
  logger.info(`Server listening on port ${PORT}`);
};

module.exports = { logServerError, logServerRunning };
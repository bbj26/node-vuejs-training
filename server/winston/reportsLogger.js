const logger = require('../winston');

const logPdfCreationError = (error) => {
  logger.error(`Error creating PDF file. ${error.message}`);
};
const logReadPdfError = (error) => {
  logger.error(`Error reading PDF file: ${error.stack}`);
};
const logSuccess = (operation, employeeId) => {
  logger.info(`Successfull operation: ${operation}. Employee id: ${employeeId}`);
};

module.exports = {
  logPdfCreationError,
  logReadPdfError,
  logSuccess,
};
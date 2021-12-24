const logger = require('../winston');
const { FETCH_ANNUAL_REPORT } = require('../constants/apiMethodNames');
const logPdfCreationError = (error) => {
  logger.error(`Error creating PDF file. ${error.message}`);
};
const logReadPdfError = (error) => {
  logger.error(`Error reading PDF file: ${error.stack}`);
};
const logFetchSuccessAnnual = (employeeId) => {
  logger.info(`Successfull operation: ${FETCH_ANNUAL_REPORT}. Employee id: ${employeeId}`);
};

module.exports = {
  logPdfCreationError,
  logReadPdfError,
  logFetchSuccessAnnual,
};
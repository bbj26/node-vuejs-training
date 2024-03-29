const logger = require('../winston');

const logFetchSuccess = () => {
  logger.info('Succesfull operation: fetchEmployees');
};
const logCreationSuccess = (employee) => {
  logger.info(`New employee created. Name: ${employee.name} - id: ${employee._id}`);
};
const logDeletionSuccess = (name) => {
  logger.info(`Employee deleted: ${name}`);
};
const logServerError = (error, operation) => {
  let logMeta = { stack: error.stack };
  logger.error(`Operation failed: ${operation}. Error: ${error.message}`,
    { metadata: logMeta });
};
const logValidationError = (error, operation) => {
  logger.error(`Operation failed: ${operation}. Invalid value ` +
    `'${error.value}' for property '${error.param}'. Error: ${error.msg}`);
};
const logDeletion404Error = (id) => {
  logger.error('Operation failed: deleteEmployee. ' +
    `employeeId: '${id}' not found`);
};

module.exports = {
  logFetchSuccess,
  logCreationSuccess,
  logDeletionSuccess,
  logServerError,
  logValidationError,
  logDeletion404Error
};
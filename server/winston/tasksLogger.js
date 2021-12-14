const logger = require('../winston');

const logFetchSuccess = (operation) => {
  logger.info(`Successfull operation: ${operation}`);
};
const logCreationSuccess = (task) => {
  logger.info(`Successfull operation: createTask. Name: ${task.name} - ` +
    `owner id: ${task._id}`);
};
const logDeletionSuccess = (name) => {
  logger.info(`Successfull operation: deleteTask. Task deleted: ${name}`);
};
const logUpdationSuccess = (id, completed) => {
  logger.info(`Successfull operation: setTaskCompletion. taskId: ${id}` +
    ` completed: ${completed}`);
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
const log404Error = (id, operation) => {
  logger.error(`Operation failed: ${operation}. ` +
    `taskId: '${id}' not found`);
};
const log405Error = (id) => {
  logger.error('Operation failed: deleteTask. Not allowed - deadline expired.' +
    `taskId: ${id}`);
};

module.exports = {
  logFetchSuccess,
  logCreationSuccess,
  logDeletionSuccess,
  logUpdationSuccess,
  logServerError,
  logValidationError,
  log404Error,
  log405Error
};
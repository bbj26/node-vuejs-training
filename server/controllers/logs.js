const { formatApiErrorEmail, sendEmail } = require('../services/emailService');
const { FETCH_LOGS } = require('../constants/apiMethodNames');
const { validationResult } = require('express-validator');
const Log = require('../models/log');
const logger = require('../winston');

const fetchLogs = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    logValidationError(error);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  const { count = 0, sort = 'desc', level = 'info', message = '' } = req.body;
  const regex = new RegExp(message, 'i');
  try {
    const logs = await Log.find({ message: { $regex: regex }, level })
      .sort({ timestamp: sort })
      .limit(count);
    logSuccess();
    res.status(200).json(logs);
  } catch (error) {
    logServerError(error);
    sendEmail(formatApiErrorEmail(FETCH_LOGS, error));
    res.status(500).json({ code: 500, message: error.message });
  }
};

const logSuccess = () => {
  logger.info('Succesfull operation: fetchLogs');
};
const logServerError = (error) => {
  logger.error(`Operation failed: fetchLogs. Error: ${error.message}`);
};
const logValidationError = (error) => {
  logger.error('Operation failed: fetchLogs. Invalid value ' +
    `'${error.value}' for property '${error.param}'. Error: ${error.msg}`);
};

module.exports = { fetchLogs };
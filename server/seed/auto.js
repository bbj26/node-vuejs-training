const {
  SKIP_AUTOSEED,
  START_AUTOSEED
} = require('../constants/infoMessages');
const Employee = require('../models/employee');
const logger = require('../winston');
const seedDb = require('.');

const autoseed = async () => {
  try {
    const count = await Employee.countDocuments();
    if (!count) {
      logger.info(START_AUTOSEED);
      seedDb();
    } else { logger.info(SKIP_AUTOSEED); }
  } catch (error) { logger.error(`Autoseed failed. ${error.message}`); }
};

module.exports = { autoseed };
const { DB_CONNECTED } = require('../constants/infoMessages');
const {
  formatDbConnectionErrorEmail,
  sendEmail
} = require('../services/emailService');
const { db: { DB_CONNECTION } } = require('../config');
const logger = require('../winston');
const mongoose = require('mongoose');
const { seedDb } = require('./auto');

mongoose.connect(DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    logger.info(DB_CONNECTED);
    seedDb();
  })
  .catch(err => {
    logger.log('fatal', `Problem with connection to DB. Error: ${err.message}` +
      ` Details: ${err.stack}`);
    sendEmail(formatDbConnectionErrorEmail(err));
  });
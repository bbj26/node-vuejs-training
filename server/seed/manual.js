const {
  formatDbConnectionErrorEmail,
  sendEmail
} = require('../services/emailService');
const { db: { DB_CONNECTION } } = require('../config');
const { 
  logDbConnectionError,
  logDbConnectionSuccess
} = require('../winston/dbLogger');
const mongoose = require('mongoose');
const { seedDb } = require('./auto');

mongoose.connect(DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    logDbConnectionSuccess();
    seedDb();
  })
  .catch(error => {
    logDbConnectionError(error);
    sendEmail(formatDbConnectionErrorEmail(error));
  });
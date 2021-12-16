const { config: { services: { email } } } = require('../config');
const logger = require('../winston');
const nodemailer = require('nodemailer');

const defaultData = {
  emailSubject: 'Error in T0-DO App',
  recipientAddress: email.recipient
};

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: email.sender,
    pass: email.senderPassword
  }
});

const sendEmail = data => {
  const {
    emailMessage,
    emailSubject = data.emailSubject || defaultData.emailSubject,
    recipientAddress = data.recipientAddress || defaultData.recipientAddress
  } = data;
  const options = {
    from: email.sender,
    to: recipientAddress,
    subject: emailSubject,
    text: emailMessage
  };
  transporter.sendMail(options, (error, info) => {
    if (error) {
      logger.error(`Error sending an automated email: ${error.message}`);
      return;
    }
    logger.info(`An automated email successfully sent to ${info.response}`);
  });
};

const formatApiErrorEmail = (action, error) => {
  return `${action} error. Details:\n${error.stack}`;
};

const formatDbConnectionErrorEmail = (error) => {
  return {
    emailMessage: 'Error while connecting with database. Details:' +
      `\n${error.stack}`
  };
};

module.exports = { sendEmail, formatApiErrorEmail, formatDbConnectionErrorEmail };
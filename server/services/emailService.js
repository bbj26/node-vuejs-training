const { services: { email } } = require('../config');
const logger = require('../winston');
const nodemailer = require('nodemailer');

const defaultSubject = 'Error in T0-DO App';
const defaultRecipient = email.recipient;

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: email.sender,
    pass: email.senderPassword
  }
});

const sendEmail = (emailMessage, emailSubject = defaultSubject,
  recipientAddress = defaultRecipient) => {
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

const formatApiErrorEmail = (action, error) =>{
  return `${action} error. Details:\n${error.stack}`;
};

module.exports = { sendEmail, formatApiErrorEmail };
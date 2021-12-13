const nodemailer = require('nodemailer');
const logger = require('../winston');
require('dotenv/config');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD
  }
});
const options = { from: process.env.SENDER_EMAIL };

const sendEmail = (emailSubject, emailMessage, recipientAddress) => {
  options.subject = emailSubject;
  options.text = emailMessage;
  options.to = recipientAddress;
  transporter.sendMail(options, (error, info) => {
    if (error) {
      logger.error(`Error sending an automated email: ${error.message}`);
      return;
    }
    logger.info(`An automated email successfully sent. ${info.response}`);
  });
};
module.exports = { sendEmail };
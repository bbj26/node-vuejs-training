const { specs, swaggerUI } = require('./swagger');
const cors = require('cors');
const express = require('express');
require('dotenv').config();
const logger = require('./winston');
const mongoose = require('mongoose');
const router = require('./router');
const { sendEmail } = require('./nodemailer');
const PORT = 4101 || process.env.PORT;

const db = process.env.DB_CONNECTION;
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, })
  .then(logger.info('Successfully connected to remote MongoDB.'))
  .catch(err => {
    logger.log('fatal', `Problem with connection to DB. Error: ${err.message}` +
      ` Details: ${err.stack}`);
    sendEmail('TO-DO app database error', 'Lost connection with the database.' +
      `Details:\n${err.stack}`, process.env.RECIPIENT_EMAIL);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/', router);

app.get('/', (req, res) => {
  res.send('You accessed simple Node.js/Express server');
});

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
}).on('error', (error) => {
  logger('fatal', `Server is down. Error: ${error.message}. Details: ` +
    `${error.stack}`);
});
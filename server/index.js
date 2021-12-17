const { app: { PORT }, db: { DB_CONNECTION } } = require('./config');
const {
  formatDbConnectionErrorEmail,
  sendEmail
} = require('./services/emailService');
const { specs, swaggerUI } = require('./swagger');
const cors = require('cors');
const { DB_CONNECTED } = require('./constants/infoMessages');
const express = require('express');
const logger = require('./winston');
const mongoose = require('mongoose');
const router = require('./router');

mongoose.connect(DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(logger.info(DB_CONNECTED))
  .catch(err => {
    logger.log('fatal', `Problem with connection to DB. Error: ${err.message}` +
      ` Details: ${err.stack}`);
    sendEmail(formatDbConnectionErrorEmail(err));
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
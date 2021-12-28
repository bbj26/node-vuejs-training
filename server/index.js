const { app: { PORT }, db: { DB_CONNECTION } } = require('./config');
const {
  formatDbConnectionErrorEmail,
  sendEmail
} = require('./services/emailService');
const { specs, swaggerUI } = require('./swagger');
const {
  logDbConnectionError,
  logDbConnectionSuccess
} = require('./winston/dbLogger');
const { logServerError, logServerRunning } = require('./winston/serverLogger');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');
const { autoseed } = require('./seed/auto');

mongoose.connect(DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    logDbConnectionSuccess();
    autoseed();
  })
  .catch(error => {
    logDbConnectionError(error);
    sendEmail(formatDbConnectionErrorEmail(error));
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/', router);
app.set('view engine', 'ejs');    
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.send('You accessed simple Node.js/Express server');
});

app.listen(PORT, () => {
  logServerRunning(PORT);
}).on('error', (error) => {
  logServerError(error);
});
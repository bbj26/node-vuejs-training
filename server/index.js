const express = require('express');
const PORT = 4101 || process.env.PORT;
const router = require('./router');
require('dotenv').config();
const cors = require('cors');
const { swaggerUI, specs } = require('./swagger');
const logger = require('./winston');

const mongoose = require('mongoose');
const db = process.env.DB_CONNECTION;
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true, })
  .then(logger.info('Successfully connected to remote MongoDB.'))
  .catch(err =>
    logger.log('fatal', `Problem with connection to DB. Error: ${err.message}`)
  );

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
  logger('fatal', `Server is down. Error: ${error.message}`);
});
const express = require('express');
const PORT = 4101 || process.env.PORT;
const router = require('./router');
require('dotenv').config();
const cors = require('cors');
const { swaggerUI, specs } = require('./swagger/swagger');

const mongoose = require('mongoose');
const db = process.env.DB_CONNECTION;
mongoose.connect(db)
  .then(console.log('Successfully connected to remote MongoDB.'))
  .catch((err => console.log('Problem with connection to DB. ' + err)));

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/', router);

app.get('/', (req, res) => {
  res.send('You accessed simple Node.js/Express server');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
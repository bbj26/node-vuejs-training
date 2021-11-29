const express = require('express');
const app = express();
const PORT = 4101 || process.env.PORT;
const router = require('./router');
require('dotenv').config();
const cors = require('cors');

const mongoose = require('mongoose');
const db = process.env.DB_CONNECTION;
mongoose.connect(db)
  .then(console.log('Successfully connected to remote MongoDB.'))
  .catch((err => console.log('Problem with connection to DB. ' + err)));

app.use(cors());
app.use(express.json());
app.use('/', router);

app.get('/', (req, res) => {
  res.send('You accessed simple Node.js/Express server');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
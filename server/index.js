const express = require('express')
require('dotenv/config')
const app = express()
const PORT = 4101 || process.env.PORT

const mongoose = require('mongoose')
const item = require('./models/item')

const db = process.env.DB_CONNECTION;

mongoose.connect(db, (err) => {
  if (err) {
    console.log('Problem with connection to DB. ' + err)
  } else {
    console.log('Successfully connected to remote MongoDB.')
  }
})
const Item = require('./models/item')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('You accessed simple Node.js/Express server')
})

// get all items
app.get('/items', (req, res) => {
  Item.find({}, (err, data) => {
    if (!err) {
      res.send(data)
    } else {
      console.log(err);
    }
  })
})

// add new item
app.post('/items', (req, res) => {
  let itemData = {
    name: req.body.name,
    createdAt: req.body.createdAt
  }
  let item = new Item(itemData);

  item.save((err, savedItem) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).json({ code: 200, message: 'Item added successfully', addedItem: savedItem })
    }
  })

})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
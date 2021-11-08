const express = require('express')
const router = express.Router()
const itemController = require('./controllers/items')

const mongoose = require('mongoose')
const db = process.env.DB_CONNECTION;
mongoose.connect(db, (err) => {
  if (err) {
    console.log('Problem with connection to DB. ' + err)
  } else {
    console.log('Successfully connected to remote MongoDB.')
  }
})

router.get('/items', itemController.fetchItems)
router.post('/items', itemController.createItem)

module.exports = router
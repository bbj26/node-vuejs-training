const express = require('express')
const router = express.Router()
const itemController = require('./controllers/items')

router.get('/items', itemController.fetchItems)
router.post('/items', itemController.createItem)

module.exports = router
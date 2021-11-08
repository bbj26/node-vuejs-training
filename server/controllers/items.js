const Item = require('../models/item')

const fetchItems = async (req, res) => {
  const items = await Item.find({})
  try {
    res.status(200).json(items)
  } catch (error) {
    res.status(404).json({code: 404, msg: error})
  }
}

const createItem = async (req, res) => {
  let itemData = {
    name: req.body.name,
    createdAt: req.body.createdAt
  }
  let item = new Item(itemData);

  const savedItem = await item.save()
  try {
    res.status(201).json({ code: 201, message: 'Item added successfully', saved: savedItem})
  } catch (error) {
    res.status(400).json({code: 400, msg: error})
  }
}

module.exports = {
  fetchItems,
  createItem
}
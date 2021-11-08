const Item = require('../models/item')

const fetchItems = async (req, res) => {
  const items = await Item.find({})
  try {
    res.json(items)
  } catch (error) {
    console.log(error)
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
    res.status(201).json({ code: 200, message: 'Item added successfully', saved: savedItem})
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  fetchItems,
  createItem
}
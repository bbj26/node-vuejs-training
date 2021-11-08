const Item = require('../models/items')

const fetchItems = (req, res) => {
  Item.find({}, (err, data) => {
    if (!err) {
      res.send(data)
    } else {
      console.log(err);
    }
  })
}

const createItem = (req, res) => {
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

}

module.exports = {
  fetchItems,
  createItem
}
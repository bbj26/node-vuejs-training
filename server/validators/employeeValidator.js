const { body } = require('express-validator')

const validate = (method) => {
  switch (method) {
    case 'createEmployee': {
      return [
        body('name', `Name doesn't exists. Please provide one.`)
          .exists(),
        body('name', `Name must be at least 2 characters long.`)
          .trim()
          .isLength({ min: 2 }),
        body('name', `Name must not be more than 30 characters long.`)
          .trim()
          .isLength({ max: 30 })
      ]
    }
  }
}

module.exports = {
  validate
}
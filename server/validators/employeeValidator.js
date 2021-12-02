const { body } = require('express-validator')

const validate = (method) => {
  switch (method) {
    case 'createEmployee': {
      return [
        body('name', `Name is required. Please provide one.`)
          .exists(),
        body('name', `Name must be at least 2 characters long.`)
          .trim()
          .isLength({ min: 2 }),
        body('name', `Name can not be more than 30 characters long.`)
          .trim()
          .isLength({ max: 30 }),
        body('name', 'Name should consist only of letters')
          .isAlpha('en-US', { ignore: ' ' })
      ]
    }
  }
}

module.exports = {
  validate
}
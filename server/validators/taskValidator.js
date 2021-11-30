const { body, check } = require('express-validator/check')

const validate = (method) => {
  switch (method) {
    case 'createTask': {
      return [
        body('name', `Task name doesn't exists. Please provide one.`).exists(),
        body('name', `Task name must be at least 10 characters long`)
          .isLength({ min: 5 }),
        body('deadline', 'Please provide deadline').exists(),
        check('id', 'Please select employee to assign task to')
          .exists().isMongoId()
      ]
    }
  }
}

module.exports = {
  validate
}
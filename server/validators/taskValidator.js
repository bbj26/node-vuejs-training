const { body, check } = require('express-validator')

const validate = (method) => {
  switch (method) {
    case 'createTask': {
      return [
        body('name', `Task name doesn't exists. Please provide one.`).exists(),
        body('name', `Task name must be at least 10 characters long`)
          .trim()
          .isLength({ min: 5 }),
        body('deadline', 'Task deadline is required').exists(),
        check('id', 'Valid employee ID to assign task to is required')
          .trim()
          .exists().isMongoId()
      ]
    }
  }
}

module.exports = {
  validate
}
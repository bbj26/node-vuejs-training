const { body, check } = require('express-validator')

const validate = (method) => {
  switch (method) {
    case 'createTask': {
      return [
        body('name', `Task name is required. Please provide one.`).exists(),
        body('name', `Task name must be at least 10 characters long.`)
          .trim()
          .isLength({ min: 5 }),
        body('deadline', 'Task deadline is required. Please provide one.').exists(),
        body('deadline', 'Deadline can not be in the past')
          .not()
          .isBefore(),
        check('id', 'Select employee to assign task to.')
          .trim()
          .exists().isMongoId()
      ]
    }
  }
}

module.exports = {
  validate
}
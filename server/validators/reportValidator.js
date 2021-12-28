const { body, check } = require('express-validator');

const validate = (method) => {
  switch (method) {
    case 'fetchReport': {
      return [
        check('id', 'Employee ID must be a valid Mongo ID.')
          .isMongoId(),
      ];
    }
    case 'createAnnualReport': {
      return [
        body('employeeId', 'Employee ID is required. Please provide one.')
          .exists(),
        body('employeeId', 'Employee ID must be a valid Mongo ID.')
          .isMongoId(),
      ];
    }
    case 'createDayReport': {
      return [
        body('employeeId', 'Employee ID is required. Please provide one.')
          .exists(),
        body('employeeId', 'Employee ID must be a valid Mongo ID.')
          .isMongoId(),
        body('date', 'Date is required. Please provide one.')
          .exists(),
        body('date', 'Date must be of type Date.')
          .isDate(),
      ];
    }
  }
};

module.exports = { validate };
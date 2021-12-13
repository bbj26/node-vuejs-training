const { check } = require('express-validator');

const validate = (method) => {
  switch (method) {
    case 'fetchLogs': {
      return [
        check('count', 'Count must be of type Number.').optional()
          .isNumeric()
          .not().isString(),
        check('sort', `Sort must be 'asc' or 'desc'`).optional()
          .trim()
          .isIn(['asc', 'desc']),
        check('level', `Level must be one of: 'fatal', 'error', 'warn', 'info',` +
          `'debug', 'trace' `).optional()
          .trim()
          .isIn(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
        check('message', 'Message must be of type String').optional()
          .trim()
          .isString()
          .not().isNumeric()
      ];
    }
  }
};

module.exports = { validate };
const { body } = require('express-validator');

const addLocationValidator = [
  body('code').isLength({ min: 5, max: 5 }).withMessage('Code harus 5 karakter'),
];

module.exports = {
  addLocationValidator,
};

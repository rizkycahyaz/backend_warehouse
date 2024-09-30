const { check, validationResult } = require('express-validator');

exports.loginValidator = [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
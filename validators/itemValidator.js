const { check, validationResult } = require('express-validator');

exports.createItemValidator = [
  check('lot_batch_no').notEmpty().withMessage('Lot batch number is required'),
  check('part_no').notEmpty().withMessage('Part number is required'),
  check('qty').isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
  check('unit').notEmpty().withMessage('Unit is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.updateItemValidator = [
  check('part_no').optional().notEmpty().withMessage('Part number is required'),
  check('qty').optional().isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
  check('unit').optional().notEmpty().withMessage('Unit is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
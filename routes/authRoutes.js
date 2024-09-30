const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { loginValidator } = require('../validators/authValidator');

router.post('/login', loginValidator, login);

module.exports = router;
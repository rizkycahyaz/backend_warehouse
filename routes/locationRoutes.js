const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Tambah lokasi
router.post('/add', locationController.addLocation);

// Cari lokasi
router.post('/search', locationController.searchLocation);

module.exports = router;

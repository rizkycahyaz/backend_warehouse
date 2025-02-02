const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const authMiddleware = require('../middlewares/authMiddleware');
const { addLocationValidator } = require('../validators/locationValidator');
// Tambah lokasi
// router.post('/add', authMiddleware, addLocationValidator, locationController.addLocation);
router.post('/add', locationController.addLocation);

router.get('/', locationController.getAllLocations);
router.get('/all', locationController.getLocations);

// Cari lokasi
router.post('/search', locationController.findLocationByLotBatchNo);

module.exports = router;

const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { createItemValidator, updateItemValidator } = require('../validators/itemValidator');
const authMiddleware = require('../middlewares/authMiddleware');

// Rute untuk admin (CRUD Barang)
router.post('/create', authMiddleware, createItemValidator, itemController.createItem); // Create
router.get('/', authMiddleware, itemController.getAllItems); // Read all
router.get('/:lot_batch_no', authMiddleware, itemController.getItemById); // Read by ID
router.put('/:lot_batch_no', authMiddleware, updateItemValidator, itemController.updateItem); // Update
router.delete('/:lot_batch_no', authMiddleware, itemController.deleteItem); // Delete

module.exports = router;
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { createItemValidator, updateItemValidator } = require('../validators/itemValidator');
const authMiddleware = require('../middlewares/authMiddleware');

// Rute untuk admin (CRUD Barang)
router.post('/create', itemController.upload ,itemController.addItem); // Create
router.get('/', authMiddleware, itemController.getAllItems); // Read all
router.get('/:lot_batch_no', authMiddleware, itemController.getItemById); // Read by ID
router.put('/:lot_batch_no', authMiddleware, updateItemValidator, itemController.updateItem); // Update
router.delete('/delete/:lot_batch_no', authMiddleware, itemController.deleteItem); // Delete

// const db = require('../config/db');
// // itemRoutes.js
// router.post('/search', (req, res) => {
//   const { lot_batch_no } = req.body;

//   // Query to get location coordinates by lot_batch_no
//   const query = `
//     SELECT l.x, l.y, l.warehouse_name, l.baris, l.kolom
//     FROM material m
//     JOIN locations l ON m.location_id = l.location_id
//     WHERE m.lot_batch_no = ?
//   `;

//   db.query(query, [lot_batch_no], (err, results) => {
//     if (err) {
//       return res.status(500).json({ status: false, message: 'Error fetching item location' });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ status: false, message: 'Item not found' });
//     }
//     res.status(200).json({ status: true, data: results[0] }); // {x: ..., y: ...}
//   });
// });

 module.exports = router;

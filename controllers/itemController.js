const Item = require('../models/modelItem');
const Location = require('../models/Location');
const multer = require('multer');
const path = require('path');
const db = require('../config/db');

// Konfigurasi penyimpanan file untuk multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder untuk menyimpan file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik berdasarkan timestamp
  },
});

// Filter jenis file untuk menerima hanya JPEG dan PNG
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg and .png files are allowed'), false);
  }
};

// Inisialisasi multer
const upload = multer({ storage, fileFilter }).single('photo'); // Hanya satu file foto yang diterima

exports.addItem = async (req, res) => {
  const { lotBatchNo, partNo, description, qty, unit, locationId } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    // Validasi input utama
    if (!lotBatchNo || !partNo || !qty || !unit || !locationId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validasi format locationId (contoh: "1A02B")
    const locationRegex = /^[A-Za-z0-9]{1,2}[0-9]{2}[A-Za-z]$/;
    if (!locationRegex.test(locationId)) {
      return res.status(400).json({ error: `Invalid location code format: ${locationId}` });
    }

    // Memecah locationId menjadi bagian-bagian
    const code = locationId.match(/.{1,2}/g);
    if (!code || code.length !== 3) {
      return res.status(400).json({ error: 'Invalid location code format 2' });
    }

    // Periksa apakah lokasi ada di database
    const [warehouseName, row, column] = code;
    const location = await Location.findLocation(warehouseName, row, column);
    if (!location || !location.length) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Simpan item ke database
    const newItem = await Item.create({
      lot_batch_no: lotBatchNo,
      part_no: partNo,
      description,
      qty,
      unit,
      location_id: location[0].location_id,
      photo,
    });

    res.status(201).json({ message: 'Item added successfully', data: newItem });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Mendapatkan semua item
// exports.getAllItems = async (req, res) => {
//   try {
//     const items = Item.findAll();
//     res.status(200).json({ data: items });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching items', error: error.message });
//   }
// };

exports.getAllitem = async (req, res) => {
  try {
    const items = await Item.findAll();
    console.log('Items from database:', items); // Tambahkan log ini
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items' });
  }
};

// Mendapatkan item berdasarkan ID
exports.getItemById = async (req, res) => {
  const { lot_batch_no } = req.params;

  try {
    const item = Item.findById(lot_batch_no);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ data: item });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error: error.message });
  }
};

// Memperbarui item berdasarkan ID
exports.updateItem = async (req, res) => {
  const { lot_batch_no } = req.params;

  try {
    const updatedItem = await Item.updateById(lot_batch_no, req.body);
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item updated successfully', data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
};

// Menghapus item berdasarkan ID
exports.deleteItem = (req, res) => {
  console.log('Delete request received for ID:', req.params.lot_batch_no); // Tambahkan ini
  const { lot_batch_no } = req.params;
  Item.deleteById(lot_batch_no, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error deleting item', error: err });
    res.status(200).json({ message: 'Item deleted successfully' });
  });
};

exports.getAdminItems = async (req, res) => {
  try {
    // Hapus penggunaan lotBatchNo karena kita ingin mengambil semua data
    const sql = 'SELECT m.*, l.warehouse_name, l.kolom, l.baris FROM material m INNER JOIN locations l ON m.location_id = l.location_id';
    const [results] = await db.promise().query(sql);

    console.log('Items from database:', results);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items' });
  }
};

// Controller untuk mengambil item berdasarkan lot_batch_no
exports.getMaterial = (req, res) => {
  const { lot_batch_no } = req.params;

  const query = `
    SELECT m.*, l.warehouse_name, l.kolom, l.baris FROM material m INNER JOIN locations l ON m.location_id = l.location_id WHERE lot_batch_no = ? 
  `;

  db.query(query, [lot_batch_no], (err, results) => {
    if (err) {
      console.error('Database query error:', err.message || err); // Tambahkan log error yang lebih spesifik
      return res.status(500).json({ status: false, message: 'Database query error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ status: false, message: 'Item not found' });
    }

    console.log('Item found:', results[0]); // Log item jika ditemukan
    res.status(200).json(results[0]); // Mengirimkan hasil item jika ditemukan
  });
};

// Ekspor upload untuk digunakan di rute lain
exports.upload = upload;

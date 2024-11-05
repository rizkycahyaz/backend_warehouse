const Item = require('../models/modelItem');
const Location = require('../models/Location');
const multer = require('multer');
const path = require('path');

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

// Menambahkan item baru
exports.addItem = async (req, res) => {
    const { lotBatchNo, partNo, description, qty, unit, locationId } = req.body;
    const photo = req.file ? req.file.filename : null;

    try {
      // Memvalidasi format locationId
      const code = locationId.match(/.{1,2}/g);
      if (!code || code.length !== 3) {
        return res.status(400).json({ error: 'Invalid location code format' });
      }

      // Memeriksa apakah lokasi ada di database
      const locations = await Location.findLocation(code[0], code[1], code[2]);
      if (!locations.length) {
        return res.status(404).json({ error: 'Location not found' });
      }

      // Menyimpan item ke database
      const item = await Item.create({
        lot_batch_no: lotBatchNo,
        part_no: partNo,
        description,
        qty,
        unit,
        location_id: locations[0].location_id,
        photo,
      });

      res.status(201).json({ message: 'Item added successfully', data: item });
    } catch (error) {
      res.status(500).json({ error: error.message });
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

exports.getAdminItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    console.log("Items from database:", items); // Tambahkan log ini
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: 'Error fetching items' });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    if (!items || items.length === 0) {
      console.warn('No items found');
      return res.status(200).json([]); // Mengembalikan array kosong jika tidak ada item
    }
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
  console.log("Delete request received for ID:", req.params.lot_batch_no); // Tambahkan ini
  const { lot_batch_no } = req.params;
  Item.deleteById(lot_batch_no, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error deleting item', error: err });
    res.status(200).json({ message: 'Item deleted successfully' });
  });
};


// Ekspor upload untuk digunakan di rute lain
exports.upload = upload;
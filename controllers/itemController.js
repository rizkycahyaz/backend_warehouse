const Item = require('../models/modelItem');
const Location = require('../models/Location');

// Menambahkan barang baru
exports.addItem = async (req, res) => {
  const { lotBatchNo, partNo, description, qty, unit, locationId } = req.body;
  try {

    // const photo = req.file ? req.file.filename : null;
    const code = locationId.match(/.{1,2}/g);
    const locations = await Location.findLocation(code[0],code[1],code[2]); 
    // Simpan material ke database, dengan relasi ke lokasi
    const item = Item.create({
      lot_batch_no: lotBatchNo,
      part_no: partNo,
      description,
      qty,
      unit,
      location_id: locations[0].location_id, 
    });

    res.status(201).json({ message: 'Material added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan semua barang
exports.getAllItems = (req, res) => {
  Item.findAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching items', error: err });
    res.status(200).json({ data: results });
  });
};

// Mendapatkan barang berdasarkan ID
exports.getItemById = (req, res) => {
  const { lot_batch_no } = req.params;
  Item.findById(lot_batch_no, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching item', error: err });
    if (!results.length) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json({ data: results[0] });
  });
};

// Memperbarui barang berdasarkan ID
exports.updateItem = (req, res) => {
  const { lot_batch_no } = req.params;
  Item.updateById(lot_batch_no, req.body, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error updating item', error: err });
    res.status(200).json({ message: 'Item updated successfully', data: results });
  });
};

// Menghapus barang berdasarkan ID
exports.deleteItem = (req, res) => {
  const { lot_batch_no } = req.params;
  Item.deleteById(lot_batch_no, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error deleting item', error: err });
    res.status(200).json({ message: 'Item deleted successfully' });
  });
};
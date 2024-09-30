const Item = require('../models/Item');

// Menambahkan barang baru
exports.createItem = (req, res) => {
  Item.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error creating item', error: err });
    res.status(201).json({ message: 'Item created successfully', data: results });
  });
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
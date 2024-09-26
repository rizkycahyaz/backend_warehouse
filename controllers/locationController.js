const db = require('../config/db');
const calculateCoordinates = require('../utils/calculateCoordinates');

// Menambahkan lokasi
exports.addLocation = (req, res) => {
  try {
    const { code } = req.body;
    const warehouse_name = code.slice(0, 2);
    const kolom = code.slice(2, 4);
    const baris = code.charAt(4);
    const coordinates = calculateCoordinates(kolom, baris);

    if (!coordinates) {
      throw new Error('Koordinat melebihi batas peta.');
    }

    const { x, y } = coordinates;
    const sql = 'INSERT INTO locations (warehouse_name, kolom, baris, x, y) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [warehouse_name, kolom, baris, x, y], (err) => {
      if (err) {
        return res.status(500).json({ status: false, message: 'Error adding location' });
      }
      res.status(200).json({ status: true, message: 'Location added successfully' });
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

// Mencari lokasi
exports.searchLocation = (req, res) => {
  try {
    const { code } = req.body;
    const warehouse_name = code.slice(0, 2);
    const kolom = code.slice(2, 4);
    const baris = code.charAt(4);

    const sql = 'SELECT * FROM locations WHERE warehouse_name = ? AND kolom = ? AND baris = ?';
    db.query(sql, [warehouse_name, kolom, baris], (err, results) => {
      if (err) {
        return res.status(500).json({ status: false, message: 'Error fetching location' });
      }
      if (results.length === 0) {
        return res.status(404).json({ status: false, message: 'Location not found' });
      }
      const coordinates = calculateCoordinates(kolom, baris);
      res.status(200).json({ status: true, data: { ...results[0], ...coordinates } });
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

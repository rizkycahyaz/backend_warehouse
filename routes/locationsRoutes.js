const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Fungsi untuk menghitung koordinat berdasarkan kolom dan baris
const calculateCoordinates = (kolom, baris) => {
  const barisHeight = 1000 / 10; // Tinggi per baris dalam piksel
  const kolomWidth = 2700 / 27; // Lebar per kolom dalam piksel

  // Konversi huruf baris menjadi indeks numerik (A = 1, B = 2, ..., J = 10)
  const barisIndex = baris.charCodeAt(0) - 'A'.charCodeAt(0) + 1;

  // Konversi kolom menjadi indeks numerik (01 = 1, 02 = 2, ..., 27 = 27)
  const kolomIndex = parseInt(kolom, 10);

  // Hitung koordinat x dan y untuk tengah cell
  const x = 2700 - (kolomIndex - 1) * kolomWidth - kolomWidth / 2; // Kolom dibalik: 1 di kanan, 27 di kiri
  const y = (barisIndex - 1) * barisHeight + barisHeight / 2; // Baris menentukan Y

  // Kembalikan null jika koordinat berada di luar batas
  if (barisIndex < 1 || barisIndex > 10 || kolomIndex < 1 || kolomIndex > 27) {
    return null;
  }

  return { x, y };
};

// Tambahkan lokasi baru
router.post('/add', (req, res) => {
  try {
    const { code } = req.body;
    console.log('Received code:', code); // Log data yang diterima
    const warehouse_name = code.slice(0, 2);
    const kolom = code.slice(2, 4); // Kolom menggunakan 2 digit (01, 02, ..., 27)
    const baris = code.charAt(4); // Baris menggunakan huruf (A, B, C, ..., I)
    const coordinates = calculateCoordinates(kolom, baris);

    if (!coordinates) {
      throw new Error('Koordinat melebihi batas peta.');
    }

    const { x, y } = coordinates;

    const sql = 'INSERT INTO locations (warehouse_name, kolom, baris, x, y) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [warehouse_name, kolom, baris, x, y], (err, results) => {
      if (err) {
        console.error('Database error:', err); // Log error database
        return res.status(500).json({ status: false, message: 'Error adding location' });
      }
      res.status(200).json({ status: true, message: 'Location added successfully' });
    });
  } catch (error) {
    console.error('Error:', error.message); // Log error server
    res.status(400).json({ status: false, message: error.message });
  }
});

// Cari lokasi berdasarkan kode
router.post('/search', (req, res) => {
  try {
    const { code } = req.body;
    console.log('Received code for search:', code); // Logging
    const warehouse_name = code.slice(0, 2);
    const kolom = code.slice(2, 4); // Kolom menggunakan 2 digit (01, 02, ..., 27)
    const baris = code.charAt(4); // Baris menggunakan huruf (A, B, C, ..., I)

    const sql = 'SELECT * FROM locations WHERE warehouse_name = ? AND kolom = ? AND baris = ?';
    db.query(sql, [warehouse_name, kolom, baris], (err, results) => {
      if (err) {
        console.error('Database error:', err); // Logging
        return res.status(500).json({ status: false, message: 'Error fetching location' });
      }
      if (results.length === 0) {
        return res.status(404).json({ status: false, message: 'Location not found' });
      }
      const coordinates = calculateCoordinates(kolom, baris);
      res.status(200).json({ status: true, data: { ...results[0], ...coordinates } });
    });
  } catch (error) {
    console.error('Error:', error.message); // Logging
    res.status(400).json({ status: false, message: error.message });
  }
});

module.exports = router;
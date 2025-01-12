const db = require('../config/db');

// Fungsi untuk menambahkan lokasi ke dalam database
exports.addLocation = (warehouse_name, kolom, baris, x, y) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO locations (warehouse_name, kolom, baris, x, y) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [warehouse_name, kolom, baris, x, y], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Fungsi untuk mencari lokasi berdasarkan kode warehouse, kolom, dan baris
exports.findLocation = (warehouse_name, kolom, baris) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM locations WHERE warehouse_name = ? AND kolom = ? AND baris = ?';
    db.query(sql, [warehouse_name, kolom, baris], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Fungsi untuk mengambil semua lokasi dari database
exports.findAll = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM locations'; // Query untuk mengambil semua data
    db.query(sql, (err, results) => {
      if (err) {
        reject(err); // Jika terjadi error
      } else {
        resolve(results); // Mengembalikan hasil query
      }
    });
  });
};

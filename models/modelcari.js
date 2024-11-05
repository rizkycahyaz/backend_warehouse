const db = require('../config/db');

class location {
// Metode untuk mencari lokasi berdasarkan lot_batch_no
static findLocationByLotBatchNo(lot_batch_no) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT l.x, l.y, l.warehouse_name, l.baris, l.kolom
        FROM material m
        JOIN locations l ON m.location_id = l.location_id
        WHERE m.lot_batch_no = ?
      `;
      db.query(sql, [lot_batch_no], (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length === 0) {
          reject(new Error('location not found'));
        } else {
          resolve(results[0]); // Mengembalikan satu objek hasil
        }
      });
    });
  }
}

  module.exports = location;
  
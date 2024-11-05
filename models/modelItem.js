const db = require('../config/db');

class Item {
  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO material (lot_batch_no, part_no, description, qty, unit, location_id, photo) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(sql, [data.lot_batch_no, data.part_no, data.description, data.qty, data.unit, data.location_id, data.photo], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM material';
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static findById(lot_batch_no, callback) {
    const sql = 'SELECT * FROM material WHERE lot_batch_no = ?';
    db.query(sql, [lot_batch_no], callback);
  }


  static updateById(lot_batch_no, data, callback) {
    const sql = 'UPDATE material SET part_no = ?, description = ?, qty = ?, unit = ?, location_id = ?, photo = ? WHERE lot_batch_no = ?';
    db.query(sql, [data.part_no, data.description, data.qty, data.unit, data.location_id, data.photo, lot_batch_no], callback);
  }

  static deleteById(lot_batch_no, callback) {
    const sql = 'DELETE FROM material WHERE lot_batch_no = ?';
    db.query(sql, [lot_batch_no], callback);
  }
}

module.exports = Item;

// Fungsi untuk menambahkan lokasi ke dalam database
// exports.createItem = (data) => {
//   return new Promise((resolve, reject) => {
//     const sql = 'INSERT INTO material (lot_batch_no, part_no, description, qty, unit, location_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
//     db.query(sql, [data.lot_batch_no, data.part_no, data.description, data.qty, data.unit, data.location_id], (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };
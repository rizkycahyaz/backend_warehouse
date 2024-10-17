const db = require('../config/db');

class Item {
  static create(data, callback) {
    const sql = 'INSERT INTO material (lot_batch_no, part_no, description, qty, unit, location_id, photo) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [data.lot_batch_no, data.part_no, data.description, data.qty, data.unit, data.location_id, data.photo], callback);
  }

  static findById(lot_batch_no, callback) {
    const sql = 'SELECT * FROM material WHERE lot_batch_no = ?';
    db.query(sql, [lot_batch_no], callback);
  }

  static findAll(callback) {
    const sql = 'SELECT * FROM material';
    db.query(sql, callback);
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
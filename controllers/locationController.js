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

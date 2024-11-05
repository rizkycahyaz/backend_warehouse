const Location = require('../models/Location');
const cari = require('../models/modelcari');
const calculateCoordinates = require('../utils/calculateCoordinates');

// Fungsi untuk mengambil semua lokasi dari database
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findLocation(); // Pastikan `Location` adalah model yang valid
    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// exports.getLocations = (req, res) => {
//   const sql = 'SELECT * FROM locations';
//   db.query(sql, (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error fetching locations' });
//     }
//     res.json(results); // Mengembalikan semua lokasi
//   });
// };


exports.addLocation = async (req, res) => {
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
      
      await Location.addLocation(warehouse_name, kolom, baris, x, y);
      res.status(200).json({ status: true, message: 'Location added successfully' });
    } catch (error) {
      res.status(400).json({ status: false, message: error.message });
    }
  };
  
  exports.searchLocation = async (req, res) => {
    try {
      const { code } = req.body;
      const warehouse_name = code.slice(0, 2);
      const kolom = code.slice(2, 4);
      const baris = code.charAt(4);
  
      const result = await Location.findLocation(warehouse_name, kolom, baris);
      if (result.length === 0) {
        return res.status(404).json({ status: false, message: 'Location not found' });
      }
  
      const coordinates = calculateCoordinates(kolom, baris);
      res.status(200).json({ status: true, data: { ...result[0], ...coordinates } });
    } catch (error) {
      res.status(400).json({ status: false, message: error.message });
    }
  };

  // Controller method to handle finding location by lot_batch_no
exports.findLocationByLotBatchNo = async (req, res) => {
  const { lot_batch_no } = req.body;

  try {
    const locationData = await cari.findLocationByLotBatchNo(lot_batch_no);
    res.status(200).json({ status: true, data: locationData });
  } catch (error) {
    if (error.message === 'Item not found') {
      res.status(404).json({ status: false, message: 'Item not found' });
    } else {
      res.status(500).json({ status: false, message: 'Error fetching item location' });
    }
  }
};
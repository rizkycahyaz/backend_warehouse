const Location = require('../models/Location');
const calculateCoordinates = require('../utils/calculateCoordinates');

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
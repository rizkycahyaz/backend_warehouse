const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Secret key untuk JWT (pastikan untuk mengganti ini dengan yang aman)
const JWT_SECRET = 'your_secret_key';

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM user WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    // Cek password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error comparing passwords' });
      if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

      // Jika password benar, buat token JWT
      const token = jwt.sign({ id_user: user.id_user }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
        message: 'Login successful',
        token,
      });
    });
  });
};

// REGISTER
exports.register = async (req, res) => {
  const { email, password } = req.body;

  // Hash password sebelum menyimpan user baru
  const saltRounds = 10;
  await bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: err });

    const sql = 'INSERT INTO user (email, password) VALUES (?, ?)';
    db.query(sql, [email, hashedPassword], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });

      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

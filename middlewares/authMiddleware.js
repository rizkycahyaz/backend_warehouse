const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.id_user;
    next();
  });
};

module.exports = authMiddleware;
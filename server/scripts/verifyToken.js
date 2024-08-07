/* eslint-disable no-undef */

const secretKey = 'reomecho';
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(403).send({ message: 'No token provided.' });
    jwt.verify(token, secretKey, (error, decoded) => {
    if (error) return res.status(500).send({ message: 'Token is not valid.' });

    req.user = decoded.data;
    next();
  });
}

module.exports = { verifyToken };
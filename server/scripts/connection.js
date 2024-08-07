/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const secretKey = 'reomecho';
const jwt = require('jsonwebtoken');

const checkConnection = (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    // 如果没有提供token，返回403 Forbidden
    return res.status(200).send({ code: 403, message: 'No token provided.' });
  }

  // 使用jsonwebtoken库验证token
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) return res.status(200).send({ code: 403, message: 'Token is not valid or has expired.' });
    res.status(200).send({ code: 200, message: 'Token is valid.', data: decoded });
  });
};

module.exports = { checkConnection };
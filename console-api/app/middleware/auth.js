const jwt = require('jsonwebtoken');

const config = require('../../config');

exports.auth = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Token not found');
  try {
    const decoded = jwt.verify(token, config.jwt_key);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).send('Invalid Token');
  }
};

const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.authentication.jwtSecretKey);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized access'
    });
  }
}
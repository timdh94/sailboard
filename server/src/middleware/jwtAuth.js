const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config');

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) res.sendStatus(403);
  const userJwt = authHeaders.split(' ')[1];

  try {
    const { uid } = jwt.verify(userJwt, ACCESS_TOKEN_SECRET);
    if (!uid) res.sendStatus(403);
    req.userId = uid;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = authMiddleware;
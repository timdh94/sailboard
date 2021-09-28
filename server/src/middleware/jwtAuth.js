const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config');
const db = require('../models/index');

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

const confirmEmail = async(req, res) => {
  const emailJWT = req.params.jwt;
  try {
    if (emailJWT) {
      const { uid } = jwt.verify(emailJWT, ACCESS_TOKEN_SECRET);
      if (!uid) res.status(403).send({ message: 'error validating email '});
      await db.User.update(
        { emailConfirmed : true },
        { where: {
          id: uid
        }}
      )
      res.status(200).send({ message: 'Email confirmed '});
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error '});
  }
}

module.exports = {
  authMiddleware,
  confirmEmail
};

const db = require('../models/index');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config');

const authenticate = async (req, res) => {
  const loginForm = req.body;
  if (!loginForm.nameOrEmail || !loginForm.password) {
    res.status(403).send('Invalid form info');
    return;
  }
  
  const user = await db.User.findOne({
    include: [{
      model: db.Password
    }],
    where: {
      [Op.or]: [
        { email: loginForm.nameOrEmail },
        { userName: loginForm.nameOrEmail },
      ]
    }
  });
  
  if (!user || !user.Password) {
    res.status(403).send({ message: 'Invalid username or password' });
  }
  
  if (!user.emailConfirmed) {
    res.status(403).send({ message: 'Please confirm your email to login' });
  }
  
  await bcrypt.compare(loginForm.password, user.Password.dataValues.password)
    .then(async (success) => {
      if (!success) {
        res.status(403).send({
          message: 'Invalid username or password'
        });
        return;
      }
      const token = jwt.sign({ uid: user.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: '7d'
      });
      
      res.status(200).send({
        message: 'Logged in',
        accessToken: token,
        user: user
      });
    });
};


module.exports = {
  authenticate,
};
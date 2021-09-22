const db = require('../models/index');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const authenticate = async (req, res) => {
  const loginForm = req.body;
  console.log(loginForm);
  if (!loginForm.nameOrEmail || !loginForm.password) {
    res.status(400).send('Invalid form info');
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
  
  if (!user) {
    res.status(400).send({ message: 'Invalid username or password' });
  }
};


module.exports = {
  authenticate,
};
const db = require('../models/index.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUser = async (req, res) => {
  const newUser = req.body;
  if (!newUser.userName || !newUser.email || !newUser.password || !newUser.firstName || !newUser.lastName || !newUser.country) {
    res.status(400).send('Missing form fields');
    return;
  }
  
  // TODOS:
  // check for username / password lengths
  
  const userExists = await db.User.findOne({
    where: {
      [Op.or]: [
        {email: newUser.email},
        {userName: newUser.userName},
      ]
    }
  });

  if (userExists) {
    res.status(409).send('Username or email already exists');
    return;
  }
  const { password, ...userWithoutPass } = newUser;

  const createdUser = await db.User.create(userWithoutPass);
  if (!createdUser) {
    res.status(500).send('Error creating user');
    return;
  }

  const createdPassword = await db.Password.create({
    UserId: createdUser.id,
    password: bcrypt.hashSync(newUser.password, saltRounds),
  });
  if (!createdPassword) {
    res.status(500).send('Error creating password');
    return;
  }
  
  const token = jwt.sign({ uid: createdUser.id }, CONFIG_SECRET, {
    expiresIn: '7d' // CHANGE THIS (refresh tokens?)
  });

  res.status(200).send({
    message: 'User created successfully',
    accessToken: token,
  });
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.User.findAll();
    res.status(200).send({
      allUsers
    });
  } catch (err) {
    res.status(500).send('Error finding users');
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
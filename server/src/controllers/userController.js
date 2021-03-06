const db = require('../models/index.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config');
const nodemailer = require('nodemailer');
const cfg = require('../config');

const createAccount = async (req, res) => {
  try {
    const newUser = req.body;
    if (!newUser.userName || !newUser.email || !newUser.password || !newUser.country) {
      res.status(400).send('Missing form fields');
      return;
    }
    
    const userExists = await db.User.findOne({
      where: {
        [Op.or]: [
          {email: newUser.email},
          {userName: newUser.userName},
        ]
      }
    });
  
    if (userExists) {
      console.log('User already exists');
      res.status(409).send({
        message: 'User with that name or email already exists'
      });
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
    
    const token = jwt.sign({ uid: createdUser.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: '7d' // CHANGE THIS (refresh tokens?)
    });

    nodemailer.createTestAccount((err, account) => {
      if (err) console.log(err);
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: cfg.EMAIL_ACCOUNT, 
          pass: cfg.EMAIL_PASSWORD
        }
      });

      jwt.sign({ uid: createdUser.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: '1d'
      }, async (err, emailToken) => {
        const emailURL = `http://localhost:3000/confirmation/${emailToken}`;
        if (err) console.log(err);
        
        await transporter.sendMail({
          from: '"Sailboard.io" <sailboard@sailboard.com>',
          to: createdUser.email,
          subject: 'Confirm your sailboard email address',
          html: `Please click this link to confirm your sailboard email: <a href="${emailURL}">${emailURL}</a>`,
        });
      });
    });
    
    res.status(200).send({
      message: 'Account created',
    });
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (req, res) => {
  if (!req.userId) req.status(403).send({
    message: 'Invalid credentials'
  });
  
  const userInfo = await db.User.findOne({
    where: { id: req.userId }
  });
  
  if (!userInfo) {
    res.status(400).send({
      message: 'No user found'
    });
    return;
  }
  
  res.status(200).send({
    message: 'User found',
    user: userInfo
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
  createAccount,
  getAllUsers,
  getUserById,
};
require('dotenv').config();

const config = {
  PORT: process.env.PORT || '3001',
  HOST: process.env.HOST || 'localhost',
  DBUSER: process.env.DBUSER || 'no user',
  DBPASS: process.env.DBPASS || 'no password',
  DATABASE: process.env.DATABASE || 'no database',
  DIALECT: process.env.DIALECT || 'no dialect',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || null
};

module.exports = config;
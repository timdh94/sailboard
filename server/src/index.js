const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router');
const { PORT } = require('./config');
const db = require('./models/index');

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.static('images'));
app.use(router);
app.get('*', (req, res) => {
  res.status(404).send('404: page not found');
});

const server = app.listen(PORT, async (err) => {
  await db.sequelize.sync();
  if (err) console.log('Error starting server: ', err);
  console.log(`Server listening on port ${PORT}`);
});

module.exports = server;
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
//const router = require('./router');

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
//app.use(router);
app.get('*', (req, res) => {
  res.status(404).send('404: page not found');
});

const server = app.listen(PORT, (err) => {
  if (err) console.log('Error starting server: ', err);
  console.log(`Server listening on port ${PORT}`);
});
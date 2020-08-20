const express = require('express');

const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoute = require('./src/routes/user');
const accommodationRouter = require('./src/routes/accommodation');
const searchRouter = require('./src/routes/search');

app.get('/', (req, res) => {
  res.send('BACKEND');
});

app.use('/user', userRoute);

app.use('/accommodation', accommodationRouter);

app.use('/search', searchRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

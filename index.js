const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user_route = require('./src/routes/user');

app.get("/", (req, res) => {
    res.send("BACKEND");
});

app.use('/user', user_route);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})
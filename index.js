const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;
const db = require('./src/models');
db.sequelize.sync();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user_route = require('./src/routes/user');

const config = require('./src/pg/config');
app.get("/", (req, res) => {
    res.send(config);
});

app.use('/user', user_route);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})
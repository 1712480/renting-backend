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

app.get("/", (req, res) => {
    res.send("sign-in + sign-up API is ready");
});

app.use('/user', user_route);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})
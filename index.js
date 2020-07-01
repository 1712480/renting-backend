const express = require('express');
const app = express();
const cors = require('cors');

const pool = require('./src/pg')

const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
    pool.query('SELECT * FROM Users', (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(res.rows[0]);
        }
    
    })
})

module.exports = (a, b) => {
    return a + b;
}

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})
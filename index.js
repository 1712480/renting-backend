const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({greeting: "This is data from server"});
})

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})
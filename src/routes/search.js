const express = require('express');
const searchRouter = express.Router();
const search = require('../controllers/search.controller');

searchRouter.post('/', search.search);

module.exports = searchRouter;
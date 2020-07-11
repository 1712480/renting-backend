const express = require('express');
const user_router = express.Router();
const users = require('../../controllers/user.controller');

user_router.post('/get', users.findAll);

user_router.post('/', users.create);

user_router.put('/:id', users.update);

module.exports = user_router;
const express = require('express');
const user_router = express.Router();
const users = require('../controllers/user.controller');

user_router.post('/get', users.findBy);

user_router.post('/', users.create);

user_router.put('/:id', users.update);

user_router.post('/get-all', users.findAll);

user_router.post('/change-password', users.changePassword);

module.exports = user_router;
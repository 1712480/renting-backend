const express = require('express');

const userRouter = express.Router();
const users = require('../controllers/user.controller');

userRouter.post('/get', users.findBy);

userRouter.post('/', users.create);

userRouter.put('/:id', users.update);

userRouter.post('/get-all', users.findAll);

userRouter.post('/change-password', users.changePassword);

module.exports = userRouter;

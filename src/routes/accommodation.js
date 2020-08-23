const express = require('express');
const accommodationRouter = express.Router();
const accommodation = require('../controllers/accommodation.controller');

accommodationRouter.post('/', accommodation.create);

accommodationRouter.post('/update', accommodation.update);

accommodationRouter.post('/vote', accommodation.vote);

accommodationRouter.get('/', accommodation.getAll);

accommodationRouter.get('/:id', accommodation.getBy);

accommodationRouter.get('/get-by-user/:id', accommodation.getByUser);

module.exports = accommodationRouter;

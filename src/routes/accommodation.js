const express = require('express');
const accommodationRouter = express.Router();
const accommodation = require('../controllers/accommodation.controller');

accommodationRouter.post('/', accommodation.create);

accommodationRouter.post('/update', accommodation.update);

accommodationRouter.get('/', accommodation.getAll);

accommodationRouter.get('/:id', accommodation.getBy);

module.exports = accommodationRouter;

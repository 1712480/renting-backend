const express = require('express');
const accommodationRouter = express.Router();
const accommodation = require('../controllers/accommodation.controller');

// accommodation_router.post('/get', accommodation.findBy);

accommodationRouter.post('/', accommodation.create);

// accommodation_router.put('/:id', accommodation.update);

accommodationRouter.get('/', accommodation.getAll);

accommodationRouter.get('/:id', accommodation.getBy);

module.exports = accommodationRouter;

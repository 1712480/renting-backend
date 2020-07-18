const express = require('express');
const accommodation_router = express.Router();
const accommodation = require('../controllers/accommodation.controller');

//accommodation_router.post('/get', accommodation.findBy);

accommodation_router.post('/', accommodation.create);

//accommodation_router.put('/:id', accommodation.update);

accommodation_router.post('/getAll', accommodation.getAll);

module.exports = accommodation_router;

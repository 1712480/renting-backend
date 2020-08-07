const db = require('../../database/models');

const Accommodation = db.accommodation;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.price || !req.body.address
        || !req.body.area || !req.body.water || !req.body.electric || !req.body.owner || !req.body.images) {
    res.status(400).send({
      status: 400,
      data: 'Something is empty.'
    });
    return;
  }

  const accommodation = {
    ...req.body,
    point: 0,
    dateTime: new Date()
  };

  Accommodation.create(accommodation)
    .then(data => {
      res.status(201).send({
        status: 201,
        data
      });
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        data: err.detail || 'Some error has occurred'
      });
    });
};

exports.getBy = (req, res) => {
  Accommodation.findAll({
    where: { id: req.params.id }
  })
    .then(data => {
      res.status(200).send({
        status: 200,
        data
      });
    })
    .catch(error => {
      res.status(500).send({
        status: 500,
        data: error.message || 'Some error occurred'
      });
    });
};

exports.getAll = (req, res) => {
  Accommodation.findAll({
    include: [
      {
        model: db.user,
        as: 'author'
      }
    ]
  })
    .then(data => {
      res.status(200).send({
        status: 200,
        data
      });
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        data: err.message || 'Some error occurred'
      });
    });
};

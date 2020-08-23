const db = require('../../database/models');

const Accommodation = db.accommodation;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.price || !req.body.address
        || !req.body.area || !req.body.water || !req.body.electric || !req.body.owner || !req.body.images) {
    res.send({
      status: 400,
      data: 'Missing some mandatory field.'
    });
    return;
  }

  const accommodation = {
    ...req.body,
    vote: [],
    dateTime: new Date()
  };

  Accommodation.create(accommodation)
    .then(data => {
      res.send({
        status: 201,
        data
      });
    })
    .catch(err => {
      res.send({
        status: 500,
        data: err.detail || 'Error creating post.'
      });
    });
};

exports.getBy = (req, res) => {
  Accommodation.findAll({
    where: { id: req.params.id }
  })
    .then(data => {
      res.send({
        status: 200,
        data
      });
    })
    .catch(error => {
      res.send({
        status: 500,
        data: error.message || 'Error finding by ID.'
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
      res.send({
        status: 200,
        data
      });
    })
    .catch(err => {
      res.send({
        status: 500,
        data: err.message || 'Error finding all.'
      });
    });
};

exports.getByUser = (req, res) => {
  const userId = req.params.id;
  Accommodation.findAll({
    where: { owner: userId }
  })
    .then(data => {
      res.send({
        status: 200,
        data
      })
    })
    .catch(err => {
      res.send({
        status: 500,
        data: err.message || 'Error finding by user.'
      })
    })
}

exports.update = (req, res) => {
  const { id } = req.body;
  
  Accommodation.update(req.body, {
    where: { id }
  })
    .then(() => {
      res.send({
        status: 200,
        data: 'Updated successfully.'
      })
    })
    .catch(error => {
      res.send({
        status: 500,
        data: error.message || 'Error updating.'
      })
    })
}

exports.vote = (req, res) => {
  const { id } = req.body;

  Accommodation.update(req.body, {
    where: { id }
  })
    .then(() => {
      Accommodation.findAll({
        where: { id }
      })
        .then(data => {
          res.send({
            status: 200,
            data: data
          })
        })
        .catch(err => {
          res.send({
            status: 500,
            data: err.message || 'Error finding by ID.'
          })
        })
    })
    .catch(error => {
      res.send({
        status: 500,
        data: error.message || 'Error updating.'
      })
    })
}
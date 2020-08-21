const bcrypt = require('bcrypt');
const db = require('../../database/models');

const salt = 10;

const User = db.user;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.phone || !req.body.email || !req.body.password || !req.body.role) {
    res.send({
      status: 400,
      data: 'Missing some mandatory fields.'
    });
    return;
  }

  const user = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };

  bcrypt.hash(user.password, salt)
    .then(pass => {
      User.create({
        ...user,
        password: pass
      })
        .then(data => {
          res.send({
            status: 201,
            data
          });
        })
        .catch(err => {
          switch (err.parent.code) {
            case '23505':
              res.send({
                status: 409,
                data: "Duplication error."
              });
              break;
            default:
              res.send({
                status: 500,
                data: "Error creating account."
              });
              break;
          }
        });
    });
};

exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send({
        status: 200,
        data
      });
    })
    .catch(err => {
      res.send({
        status: 500,
        data: 'Error finding all.'
      });
    });
};

exports.findBy = (req, res) => {
  const { email, password } = req.body;

  User.findAll({
    where: { email }
  })
    .then(data => {
      if (data[0] === undefined) {
        res.send({
          status: 400,
          data: {}
        });
      } else {
        bcrypt.compare(password, data[0].dataValues.password)
          .then(result => {
            if (result) {
              res.send({
                status: 200,
                data: data[0].dataValues
              });
            } else {
              res.send({
                status: 400,
                data: {}
              });
            }
          });
      }
    })
    .catch(err => {
      res.send({
        status: 500,
        data: 'Error finding by email.'
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.body;

  User.update(req.body, {
    where: { id }
  })
    .then(() => {
      res.send({
        status: 200,
        data: 'Updated successfully.'
      });
    })
    .catch(err => {
      res.send({
        status: 500,
        data: err.message || 'Cannot update into database.'
      });
    });
};

exports.changePassword = (req, res) => {
  const { email, oldPass, newPass } = req.body;

  User.findAll({
    where: { email }
  })
    .then(data => {
      bcrypt.compare(oldPass, data[0].dataValues.password)
        .then(result => {
          if (result) {
            bcrypt.hash(newPass, salt)
              .then(pass => {
                User.update({
                  ...data[0].dataValues,
                  password: pass
                }, {
                  where: { email }
                })
                  .then(() => {
                    res.send({
                      status: 200,
                      data: 'Success.'
                    });
                  })
                  .catch(err => {
                    res.send({
                      status: 500,
                      data: err.message || 'Cannot update into database.'
                    });
                  });
              });
          } else {
            res.send({
              status: 400,
              data: 'Wrong password.'
            });
          }
        });
    })
    .catch(err => {
      res.send({
        status: 500,
        data: err.message || 'Cannot find user in database.'
      });
    });
};

exports.updateRole = (req, res) => {
  User.findAll({
    where: { role: 3 }
  })
    .then(data => {
      res.send({
        status: 200,
        data: data
      })
    })
    .catch(error => {
      res.send({
        status: 500,
        data: error.message || 'Error finding all.'
      });
    });
};
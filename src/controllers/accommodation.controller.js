const db = require('../../database/models');
const Accommodation = db.accommodation;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const accommodation = {
        ...req.body,
        point: 0,
        dateTime: new Date()
    }

    Accommodation.create(accommodation)
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
}

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
            res.send(data)
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
}
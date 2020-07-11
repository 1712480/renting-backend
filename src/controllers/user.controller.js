const db = require('../../database/models');

const User = db.user;
const Op = db.Sequelize.Op; // for operator (e.g: where condition1 Op.and condition2)

exports.create = (req, res) => {
    if (!req.body.name || !req.body.phone || !req.body.email || !req.body.password || !req.body.role) {
        res.status(400).send({
            status: 400,
            data: "Something is empty."
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

    User.create(user)
        .then(data => {
            res.status(200).send({
                status: 200,
                data: data
            });
        })
        .catch(err => {
            switch (err.parent.code) {
                case "23505":
                    // violates unique constraint
                    res.status(409).send({
                        status: 409,
                        data: err.parent.detail
                    });
                    break;
                default:
                    res.status(500).send({
                        status: 500,
                        data: err.detail || "Some error has occurred."
                    });
                    break;
            }
        });
};

exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.status(200).send({
                status: 200,
                data: data
            });
        })  
        .catch(err => {
            res.status(500).send({
                status: 500,
                data: err.message || "Some error occurred."
            });
        });
};

exports.findBy = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findAll({ 
        where: {
            [Op.and]: [
                { email: email },
                { password: password}
            ]
        }
    })
        .then(data => {
            res.status(200).send({
                status: 200,
                data: data
            });
        })  
        .catch(err => {
            res.status(500).send({
                status: 500,
                data: err.message || "Some error occurred."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    status: 200,
                    data: "Updated successfully."
                })
            } else {
                res.status(400).send({
                    status: 400,
                    data: "Cannot update."
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                status: 500,
                data: "Some error occurred."
            })
        });
};
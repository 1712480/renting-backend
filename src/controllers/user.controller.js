const db = require('../../database/models');
const bcrypt = require('bcrypt');
const salt = 10;

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

    bcrypt.hash(user.password, salt)
        .then(pass => {
            User.create({
                ...user,
                password: pass
            })
                .then(data => {
                    res.status(201).send({
                        status: 201,
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
        })
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
        where: { email: email }
    })
        .then(data => {
            if (data[0] === undefined) {
                res.status(400).send({
                    status: 400,
                    data: {}
                })
            } else {
                bcrypt.compare(password, data[0].dataValues.password)
                    .then( result => {
                        if (result) {
                            res.status(200).send({
                                status: 200,
                                data: data[0].dataValues
                            })
                        } else {
                            res.status(400).send({
                                status: 400,
                                data: {}
                            })
                        }
                    })
            }
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

exports.changePassword = (req, res) => {
    const { email, oldPass, newPass } = req.body;

    User.findAll({
        where: { email: email }
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
                                    where: { email: email }
                                })
                                    .then(data => {
                                        res.status(200).send({
                                            status: 200,
                                            data: "Success."
                                        })
                                    })
                                    .catch(err => {
                                        res.status(500).send({
                                            status: 500,
                                            data: err.message || "Something happenned."
                                        })
                                    })
                            })
                        
                    } else {
                        res.status(400).send({
                            status: 400,
                            data: "Wrong password."
                        })
                    }
                })
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                data: err.message || "Something happenned."
            })
        })
}
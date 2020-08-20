const db = require('../../database/models');
const Post = db.accommodation;
const { Op } = require('sequelize');

exports.search = (req, res) => {
  const { keyword } = req.body;

  Post.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.iLike]: `%${keyword}%`
          }
        },
        {
          address: {
            [Op.iLike]: `%${keyword}%`
          }
        },
        {
          description: {
            [Op.iLike]: `%${keyword}%`
          }
        }
      ]    
    }
  })
    .then(data => {
      res.status(200).send({
        status: 200,
        keyword: keyword,
        data: data
      });
    })
    .catch(error => {
      res.status(500).send({
        status: 500,
        data: error.message || 'Something happened'
      });
    });
};
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accommodation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      dateTime: {
        type: Sequelize.DATE
      },
      point: {
        type: Sequelize.DOUBLE
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.INTEGER
      },
      water: {
        type: Sequelize.INTEGER
      },
      electric: {
        type: Sequelize.INTEGER
      },
      owner: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accommodation');
  }
};
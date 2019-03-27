'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bikes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      licenseNumber: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      ownerFullName: {
        type: Sequelize.STRING
      },
      theftDescription: {
        type: Sequelize.STRING
      },
      theftDate: {
        type: Sequelize.DATE
      },
      isResolved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      assignedOfficerId: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bikes');
  }
};
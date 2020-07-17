'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('Links', 'accountId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      after: 'social'
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('Links', 'accountId');
  }
};
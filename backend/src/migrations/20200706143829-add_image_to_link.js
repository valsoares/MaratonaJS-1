'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('Links', 'image', {
      type: Sequelize.STRING,
      allowNull: false,
      after: 'url',
      defaultValue: 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('Links', 'image');
  }
};

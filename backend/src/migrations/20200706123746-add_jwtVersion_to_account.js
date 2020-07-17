'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('Accounts', 'jwtVersion', {
      type: Sequelize.INTEGER,
      allowNull: false,
      after: 'password_confirmation',
      defaultValue: 0
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    
    return await queryInterface.removeColumn('Accounts', 'jwtVersion');
  }
};

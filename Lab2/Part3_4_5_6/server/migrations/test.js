'use strict';

module.exports = {
  up: function (migration, DataTypes, done) {
      queryInterface.addColumn({
          tableName: 'Person',
          schema: 'public'
        },
        'signature',
        Sequelize.STRING)
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
  
      Example:
      return queryInterface.dropTable('users');
    */
  }
};

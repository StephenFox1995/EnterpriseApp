'use strict';

module.exports = {
  up: function (migration, DataTypes, done) {
    migration.dropTable('Courtroom');
    migration.dropTable('Judge');
    migration.dropTable('Participent');
    migration.dropTable('Case');
    
    migration.createTable('Courtroom', {
      number: DataTypes.STRING,
    });

    migration.createTable('Judge', {
      name: DataTypes.STRING,
      room: DataTypes.INTEGER,
      ext: DataTypes.STRING,
    });

    migration.createTable('Participent', {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        values: ['claimant', 'respondent'],
      },
    });

    migration.createTable('Case', {
      judge_id: {
        type: DataTypes.INTEGER,
        references: {
          model: DataTypes.Judge,
          key: 'id',
        },
      },
      courtroom_id: {
        type: DataTypes.INTEGER,
        references: {
          model: DataTypes.Courtroom,
          key: 'id',
        },
      },
      claimant_id: {
        type: DataTypes.INTEGER,
        references: {
          model: DataTypes.Participent,
          key: 'id',
        },
      },
      respondent_id: {
        type: DataTypes.INTEGER,
        references: {
          model: DataTypes.Participent,
          key: 'id',
        },
      },
      start_date: DataTypes.DATE,
      duration: DataTypes.INTEGER,
      result: DataTypes.BOOLEAN,
    });
    done(null);
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

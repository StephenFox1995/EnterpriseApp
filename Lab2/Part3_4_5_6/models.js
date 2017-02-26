const Sequelize = require('sequelize');
const sequelize = require('./connection')();

// returns all the models.
module.exports = () => {
  const Judge = sequelize.define('judge', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    room: Sequelize.INTEGER,
    ext: Sequelize.STRING,
  });

  const Courtroom = sequelize.define('courtroom', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: Sequelize.STRING,
  });

  const Participent = sequelize.define('participent', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    address: Sequelize.STRING,
    type: {
      type: Sequelize.STRING,
      values: ['claimant', 'respondent'],
    },
  });

  const Case = sequelize.define('case', {
    judge_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Judge,
        key: 'id',
        deferrable: Sequelize.Deferrable.NOT,
      },
    },
    courtroom_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Courtroom,
        key: 'id',
        deferrable: Sequelize.Deferrable.NOT,
      },
    },
    claimant_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Participent,
        key: 'id',
        deferrable: Sequelize.Deferrable.NOT,
      },
    },
    respondent_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Participent,
        key: 'id',
        deferrable: Sequelize.Deferrable.NOT,
      },
    },
    start_date: Sequelize.DATE,
    duration: Sequelize.INTEGER,
    result: Sequelize.BOOLEAN,
  });
  return { Judge, Courtroom, Participent, Case };
};
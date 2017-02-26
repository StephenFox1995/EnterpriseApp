'use strict';
module.exports = function (sequelize, DataTypes) {
  var Case = sequelize.define('Case', {
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
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return Case;
};
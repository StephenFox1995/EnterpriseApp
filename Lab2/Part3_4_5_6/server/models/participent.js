'use strict';
module.exports = function (sequelize, DataTypes) {
  var Participent = sequelize.define('Participent', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      values: ['claimant', 'respondent'],
    },
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return Participent;
};
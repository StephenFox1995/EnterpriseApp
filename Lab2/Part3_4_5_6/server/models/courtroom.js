'use strict';
module.exports = function(sequelize, DataTypes) {
  var Courtroom = sequelize.define('Courtroom', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Courtroom;
};
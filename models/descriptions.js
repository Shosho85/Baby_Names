"use strict";
module.exports = function(sequelize, DataTypes) {
  var descriptions = sequelize.define("descriptions", {
    meaning: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    origin: DataTypes.STRING,
    babyname_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        descriptions.belongsTo(models.babynames, { foriegnKey: 'babyname_id' })
      }
    }
  });
  return descriptions;
};
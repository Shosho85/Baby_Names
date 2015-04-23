"use strict";
module.exports = function(sequelize, DataTypes) {
  var descriptions = sequelize.define("descriptions", {
    meaning: DataTypes.STRING,
    gender: DataTypes.STRING,
    origin: DataTypes.STRING,
    babyname_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        descriptions.belongsTo(models.babynames, { foreignKey: 'babyname_id' });
      }
    }
  });
  return descriptions;
};
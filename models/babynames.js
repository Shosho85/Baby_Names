"use strict";
module.exports = function(sequelize, DataTypes) {
  var babynames = sequelize.define("babynames", {
    babyname: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        babynames.belongsTo(models.users, { foreignKey: 'user_id' });
        babynames.hasMany(models.descriptions, { foreignKey: 'babyname_id' })
      }
    }
  });
  return babynames;
};
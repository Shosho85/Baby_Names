"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    username: DataTypes.STRING,
    password_digest: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        users.hasMany(models.babynames, { foreignKey: 'user_id' });
      }
    }
  });
  return users;
};
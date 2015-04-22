"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("babynames", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      babyname: {
        type: DataTypes.STRING
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("babynames").done(done);
  }
};
"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("descriptions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      meaning: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.BOOLEAN
      },
      origin: {
        type: DataTypes.STRING
      },
      babyname_id: {
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
    migration.dropTable("descriptions").done(done);
  }
};
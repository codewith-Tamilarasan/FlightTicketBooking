'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('List', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departtime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      arrivaltime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      from: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      modelName: 'list',
      tableName: 'lists',
      timestamps: false,
      sequelize: queryInterface.sequelize
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('List');
  }
};

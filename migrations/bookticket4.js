'use strict';
const {Datatypes} = require('sequelize')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BookedTickets', {
      tableid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
      },
      flightid: {
        type: Sequelize.INTEGER,
        autoIncrement:false,
      },
      useremail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      flightname: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BookedTickets');
  },
};

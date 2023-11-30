

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('flight', 'postgres', 'tamil@db', {
  host: 'localhost',
  dialect: 'postgres', // Change this to your database dialect (mysql, postgres, sqlite, etc.)
});

module.exports = sequelize;

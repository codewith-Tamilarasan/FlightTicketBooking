const { DataTypes, Model } = require('sequelize')
const  sequelize = require('../src/sequilize');

class BookedTickets extends Model {
  static associate(models) {

  }
}

BookedTickets.init({
  tableid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    
  },
  flightid:{
    type: DataTypes.INTEGER,
    autoIncrement:false,

  },
  useremail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flightname: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'BookedTickets',
  tableName: 'BookedTickets',
  timestamps: false,
});

module.exports = BookedTickets;

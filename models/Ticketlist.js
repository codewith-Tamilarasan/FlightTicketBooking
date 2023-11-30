const { DataTypes, Model } = require('sequelize')
const  sequelize = require('../src/sequilize');

class List extends Model {
  static associate(models) {
    
  }
}

List.init(
  {
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
    from :{
        type:DataTypes.STRING,
        allowNull:false,
    },
    to: {
        type:DataTypes.STRING,
        allowNull:false,
    }

  },
  {
    sequelize,
    modelName: 'list',
    tableName: 'List',
    timestamps: false,
  }
);

module.exports = List;

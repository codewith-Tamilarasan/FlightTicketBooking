const { DataTypes, Model } = require('sequelize')
const  sequelize = require('../src/sequilize');

class Admin extends Model {
  static associate(models) {

  }
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    adminname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Admin',
    tableName: 'Admin',
    timestamps: false,
  }
);

module.exports = Admin;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Mainmood extends Model {}

Mainmood.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  main_mood_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'mainmood',
});

module.exports = Mainmood;
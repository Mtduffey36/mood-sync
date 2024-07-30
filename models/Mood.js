const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Mood extends Model {}

Mood.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  mood_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mood_score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  mood_main_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'mainmood',
      key: 'id'
    }
  },

createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'mood',
});

module.exports = Mood;
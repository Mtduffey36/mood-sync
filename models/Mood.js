const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Mood extends Model{};

Mood.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    mood_name:{
        type: DataTypes.STRING,
        allowNull: false
    },

    mood_category:{
        type: DataTypes.STRING,
        allowNull: false
    },
    mood_score:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mood_sub:{
        type: DataTypes.STRING,
        allowNull: false
    },
    


},{
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'mood',
});

module.exports = Mood;
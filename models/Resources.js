const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Resources extends Model{};

Resources.init({

    id:{
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false
    },
    title:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    category:{
        type: DataTypes.STRING,
        allowNull: false
    },
    url:{
        type: DataTypes.STRING,
    
    },

},{
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'resources',
});

module.exports = Resources;
const bcrypt = require('bcrypt');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {
  async checkPassword(loginPw) {
    console.log('Stored hashed password:', this.password);
    console.log('Provided login password:', loginPw);
    const isValid = await bcrypt.compare(loginPw, this.password);
    console.log('Password comparison result:', isValid);
    return isValid;
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6],
    },
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^\+?[1-9]\d{1,14}$/,
        msg: 'Phone number must be a valid E.164 format'
      },
    },
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  hooks: {
    async beforeCreate(newUserData) {
      console.log('Original password:', newUserData.password); 
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
      console.log('Hashed password:', newUserData.password);
      return newUserData;
    },
    async beforeUpdate(updatedUserData) {
      if (updatedUserData.password) {
        console.log('Original password:', updatedUserData.password); 
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        console.log('Hashed password:', updatedUserData.password);
      }
      return updatedUserData;
    },
  },
  sequelize,
  timestamps: true,  
  freezeTableName: true,
  underscored: true,
  modelName: 'users',
});

module.exports = User;
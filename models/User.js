const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  async checkPassword(loginPw) {
    return await bcrypt.compare(loginPw, this.password);
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
    beforeCreate: async (user) => {
      if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        console.log('Hashed password before storage:', hashedPassword);
        user.password = hashedPassword;
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        console.log('Hashed password before update:', hashedPassword);
        user.password = hashedPassword;
      }
    },
  },
  sequelize,
  timestamps: true,  
  freezeTableName: true,
  underscored: true,
  modelName: 'users',
});

module.exports = User;
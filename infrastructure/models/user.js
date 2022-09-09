'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Transaction, {
        foreignKey: 'sender'
      });
      User.hasOne(models.Wallet, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        allowNull: true,
        as: 'Wallet'
      });
      User.hasOne(models.Credential, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        allowNull: true
      });
    }

  }

  ;
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};
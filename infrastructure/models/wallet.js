'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wallet.hasOne(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        allowNull: true
      });
    }

  }

  ;
  Wallet.init({
    userId: DataTypes.INTEGER,
    balance: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Wallet'
  });
  return Wallet;
};
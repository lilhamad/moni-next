'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Credential extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Credential.hasOne(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        allowNull: true
      });
    }

  }

  ;
  Credential.init({
    public: DataTypes.STRING,
    secret: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Credential'
  });
  return Credential;
};
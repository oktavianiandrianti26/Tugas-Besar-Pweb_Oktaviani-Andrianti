"use strict";
const { Model } = require("sequelize");
const sequelize = require('../database');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      nama: DataTypes.STRING,
      departement: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../database');

// const User = sequelize.define('User', {
//   email: {
//             type: DataTypes.STRING,
//             unique: true,
//           },
//           nama: DataTypes.STRING,
//           departement: DataTypes.STRING,
//           password: DataTypes.STRING,
//           role: DataTypes.STRING,
// }, {
//     tableName: 'login'
// });

// module.exports = User;

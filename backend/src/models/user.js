"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        onDelete: "CASCADE",
        hooks: true,
        foreignKey: "userId",
      });
      User.hasMany(models.Comment, {
        onDelete: "CASCADE",
        hooks: true,
        foreignKey: "userId",
      });
      User.hasMany(models.UserResolvedContestation, {
        onDelete: "CASCADE",
        hooks: true,
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      bio: DataTypes.STRING,
      profilePicture: {
        type: DataTypes.STRING,
        defaultValue: 'profile.jpg',
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
    }
  );

  return User;
};

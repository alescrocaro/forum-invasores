"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.hasMany(models.Image, {
        onDelete: "CASCADE",
        hooks: true,
        foreignKey: "postId",
      });
      Post.hasMany(models.Comment, {
        onDelete: "CASCADE",
        hooks: true,
        foreignKey: "postId",
      });
      Post.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      biome: DataTypes.STRING,
      fitofisionomia: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      userName: DataTypes.STRING,
      specie: DataTypes.STRING,
      genus: DataTypes.STRING,
      family: DataTypes.STRING,
      order: DataTypes.STRING,
      className: DataTypes.STRING,
      phylum: DataTypes.STRING,
      kingdom: DataTypes.STRING,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      weather: DataTypes.STRING,
      dateFound: DataTypes.DATE,
      description: DataTypes.STRING,
      tags: DataTypes.ARRAY(DataTypes.STRING),
      latlng: DataTypes.GEOMETRY,
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "Posts",
    }
  );
  return Post;
};

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../dbConfig");
const { Rent } = require("./rent");

class Book extends Model {}

Book.init(
  {
    bookName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publication: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placedAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRented: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    addedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Book",
  }
);

Book.hasMany(Rent, { as: "rents", foreignKey: "book_id" });

module.exports = { Book };

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../dbConfig");
const { Rent } = require('./rent');

class User extends Model {}

User.init(
  {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primary: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    gender:{
      type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    mobile: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addressLine1:{
      type: DataTypes.STRING
    },
    addressLine2:{
      type: DataTypes.STRING,
    },
    city:{
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING
    },
    pincode: {
      type: DataTypes.INTEGER(6).UNSIGNED
    },
    country: {
      type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.hasMany(Rent, {as: 'rents', foreignKey:'user_id'});

module.exports = { User };

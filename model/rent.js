const { DataTypes, Model } = require("sequelize");
const sequelize = require("../dbConfig");

class Rent extends Model {}

Rent.init(
  {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amountPaid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rentedFrom: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    rentedTill: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    isReturned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    returnedOn: {
      type: DataTypes.DATEONLY,
    },
    razorPayOrderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    razorPayPaymentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    changedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Rent",
  }
);

module.exports = { Rent };

// models/auth/refreshToken.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database_sequlize");
const User = require("../models/users/users");

const RefreshToken = sequelize.define(
  "refresh_tokens",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Mengaktifkan created_at
    updatedAt: false, // Menonaktifkan updated_at
    underscored: true,
  }
);

module.exports = RefreshToken;

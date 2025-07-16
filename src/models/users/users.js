const Sequelize = require("sequelize");

const { sequelize } = require("../../config/database_sequlize");

const { DataTypes } = Sequelize;

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nama tidak boleh kosong.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email ini sudah terdaftar.",
      },
      validate: {
        isEmail: {
          msg: "Format email tidak valid.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telepon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    data_status: {
      type: DataTypes.INTEGER,
      defaultValue: 1, // 1 untuk aktif, 0 untuk nonaktif (soft delete)
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  }
);

module.exports = User;

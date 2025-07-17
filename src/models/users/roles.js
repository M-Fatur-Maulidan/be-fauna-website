// models/roles/role.js
const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../config/database_sequlize"); // Sesuaikan path jika perlu

const Role = sequelize.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        msg: "Nama role sudah ada.",
      },
      validate: {
        notEmpty: {
          msg: "Nama role tidak boleh kosong.",
        },
      },
    },
    data_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // 1 untuk aktif, 0 untuk nonaktif
    },
    // created_at dan updated_at akan ditangani secara otomatis oleh Sequelize
  },
  {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  }
);

module.exports = Role;

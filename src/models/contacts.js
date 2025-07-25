// models/contents/content.js
const { DataTypes, Sequelize } = require("sequelize");

const { sequelize } = require("../config/database_sequlize"); // Sesuaikan path jika perlu

const Contact = sequelize.define(
  "contacts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // created_at dan updated_at akan ditangani secara otomatis oleh Sequelize
  },
  {
    freezeTableName: true, // Nama tabel tidak akan diubah menjadi bentuk jamak
    timestamps: true, // Mengaktifkan created_at dan updated_at
    underscored: true, // Menggunakan snake_case untuk kolom otomatis (created_at, updated_at)
  }
);

module.exports = Contact;

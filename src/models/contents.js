// models/contents/content.js
const { DataTypes, Sequelize } = require("sequelize");

const { sequelize } = require("../config/database_sequlize"); // Sesuaikan path jika perlu

const Content = sequelize.define(
  "contents",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nama_umum: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    nama_ilmiah: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gambar: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    habitat: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    makanan: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    rentang_hidup: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    jenis_fauna_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status_konservasi: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    // is_verified: {
    //   type: DataTypes.TINYINT,
    //   allowNull: true,
    //   comment: "0: Pending, 1: Verified, 2: Rejected",
    // },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    data_status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1, // 1 untuk aktif
    },
    // created_at dan updated_at akan ditangani secara otomatis oleh Sequelize
  },
  {
    freezeTableName: true, // Nama tabel tidak akan diubah menjadi bentuk jamak
    timestamps: true, // Mengaktifkan created_at dan updated_at
    underscored: true, // Menggunakan snake_case untuk kolom otomatis (created_at, updated_at)
  }
);

module.exports = Content;

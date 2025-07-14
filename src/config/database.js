/*
 * =================================================================
 * FILE: src/config/database.js
 * =================================================================
 * File ini berisi konfigurasi dan fungsi untuk menghubungkan aplikasi
 * ke database. Pastikan Anda telah menginstal package yang sesuai:
 *
 * MySQL (Sequelize): npm install sequelize mysql2 dotenv
 *
 */

// Muat variabel lingkungan dari file .env
require("dotenv").config();

const { Sequelize } = require("sequelize");

/**
 * Inisialisasi instance Sequelize.
 * Kredensial diambil dari variabel lingkungan.
 */
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nama database
  process.env.DB_USER, // User database
  process.env.DB_PASSWORD, // Password database
  {
    host: process.env.DB_HOST,
    dialect: "mysql", // Dialek diubah menjadi mysql
    logging: false, // Matikan logging query SQL di konsol untuk produksi
  }
);

/**
 * Fungsi untuk mengautentikasi koneksi ke database SQL.
 */
const connectSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("Koneksi ke database SQL (MySQL) berhasil.");
  } catch (error) {
    console.error("Koneksi ke database SQL (MySQL) gagal:", error);
    process.exit(1);
  }
};

/*
 * Ekspor fungsi yang sesuai dengan database pilihan Anda.
 * Contoh ini dikonfigurasi untuk mengekspor koneksi MySQL dengan Sequelize.
 */
module.exports = {
  connectDB: connectSQL, // Menggunakan fungsi koneksi SQL
  // Mengekspor instance sequelize agar bisa digunakan untuk mendefinisikan model
  sequelize: sequelize,
};

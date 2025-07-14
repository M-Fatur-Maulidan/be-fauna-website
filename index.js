const express = require("express");

require("dotenv").config();

// Memuat koneksi database dari konfigurasi
const { connectDB } = require("./src/config/database");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Halo Dunia dari Express! 🚀</h1>");
});

// Fungsi untuk memulai aplikasi dan menghubungkan ke database
const startApp = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Gagal terhubung ke database:", error);
    process.exit(1);
  }
};

app.listen(PORT, async () => {
  await startApp();
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

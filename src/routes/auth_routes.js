// routes/authRoutes.js
const express = require("express");
const router = express.Router();

const authController = require("../controllers/api_v1_auth_controller"); // Sesuaikan path

/**
 * Mendefinisikan rute untuk autentikasi.
 * Base URL: /api/auth (misalnya)
 */

// POST /login -> Memproses login dan mengembalikan token
router.post("/login", authController.login);

// POST /register -> Memproses registrasi pengguna baru
router.post("/register", authController.register);

// POST /refresh-token -> Memproses refresh token
router.post("/refresh-token", authController.refreshToken);

// GET /check-token -> Memeriksa validitas token
router.post("/check-token", authController.tokenExpired);

// GET /logout -> Memproses logout
router.post("/logout", authController.logout);

module.exports = router;

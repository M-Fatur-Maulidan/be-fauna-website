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

module.exports = router;

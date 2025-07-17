// routes/userRoutes.js
const express = require("express");
const router = express.Router();

const userController = require("../../../controllers/admin/users/api_v1_admin_user_controllers");

const { createUploader } = require("../../../utils/UploadFile");
// Fungsi ini digunakan untuk mengupload file foto pengguna
const uploadFoto = createUploader("./src/images/users/foto/", "foto");

const { authenticateToken } = require("../../../middleware/AuthenticateToken");

const { expressjwt } = require("express-jwt");

/**
 * Mendefinisikan rute untuk resource 'users'.
 * Base URL: /users
 */

// GET /users -> Mendapatkan semua pengguna
router.get(
  "/",
  expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }),
  userController.getAllUsers
);

// GET /users/:id -> Mendapatkan pengguna berdasarkan ID
router.get(
  "/:id",
  expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }),
  userController.getUserById
);

// POST /users -> Membuat pengguna baru
router.post("/", uploadFoto, userController.createUser);

// PUT /users/:id -> Memperbarui pengguna berdasarkan ID
router.put("/:id", uploadFoto, userController.updateUser);

// DELETE /users/:id -> Menghapus pengguna berdasarkan ID (soft delete)
router.delete("/:id", userController.deleteUser);

module.exports = router;

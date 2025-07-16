// routes/userRoutes.js
const express = require("express");
const router = express.Router();

const userController = require("../../controllers/admin/api_v1_admin_user_controllers");

const { createUploader } = require("../../utils/UploadFile");

// Fungsi ini digunakan untuk mengupload file foto pengguna
const uploadFoto = createUploader("./src/images/users/foto/", "foto");

/**
 * Mendefinisikan rute untuk resource 'users'.
 */

// GET /api/users -> Mendapatkan semua pengguna
router.get("/", userController.getAllUsers);

// GET /api/users/:id -> Mendapatkan pengguna berdasarkan ID
router.get("/:id", userController.getUserById);

// POST /api/users -> Membuat pengguna baru
router.post("/", uploadFoto, userController.createUser);

// PUT /api/users/:id -> Memperbarui pengguna berdasarkan ID
router.put("/:id", uploadFoto, userController.updateUser);

// DELETE /api/users/:id -> Menghapus pengguna berdasarkan ID (soft delete)
router.delete("/:id", userController.deleteUser);

module.exports = router;

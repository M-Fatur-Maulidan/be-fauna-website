// routes/userRoleRoutes.js
const express = require("express");
const router = express.Router();

const userRoleController = require("../../../controllers/admin/users/api_v1_admin_user_role_controllers");

/**
 * Mendefinisikan rute untuk mengelola hubungan user dan role.
 * Base URL: /:user_id/roles
 */

// Menetapkan satu atau lebih peran ke seorang pengguna
// POST /:user_id/roles
router.post("/:user_id/roles", userRoleController.assignRoles);

// Mencabut sebuah peran dari seorang pengguna
// DELETE /:user_id/roles/:role_id
router.delete("/:user_id/roles/:role_id", userRoleController.removeRole);

// Mendapatkan semua peran dari seorang pengguna
// GET /:user_id/roles
router.get("/:user_id/roles", userRoleController.getUserRoles);

module.exports = router;

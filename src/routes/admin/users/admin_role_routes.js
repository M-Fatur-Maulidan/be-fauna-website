// routes/roleRoutes.js
const express = require("express");
const router = express.Router();

const roleController = require("../../../controllers/admin/users/api_v1_admin_role_controller");

/**
 * Mendefinisikan rute untuk resource 'roles'.
 * Base URL: /roles
 */

// GET / -> Mendapatkan semua roles
router.get("/", roleController.getAllRoles);

// GET /:id -> Mendapatkan role berdasarkan ID
router.get("/:id", roleController.getRoleById);

// POST / -> Membuat role baru
router.post("/", roleController.createRole);

// PUT /:id -> Memperbarui role berdasarkan ID
router.put("/:id", roleController.updateRole);

// DELETE /:id -> Menghapus role berdasarkan ID (soft delete)
router.delete("/:id", roleController.deleteRole);

module.exports = router;

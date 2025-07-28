// routes/contentRoutes.js
const express = require("express");
const router = express.Router();

const contactController = require("../../../src/controllers/admin/api_v1_admin_contact_controllers");

const { expressjwt } = require("express-jwt");

/**
 * Mendefinisikan rute untuk resource 'contents'.
 * Base URL: /contents
 */

// GET / -> Mendapatkan semua kontak
router.get("/", contactController.getAllContacts);

// DELETE /:id -> Menghapus kontak berdasarkan ID (soft delete)
router.delete(
    "/:id", 
    expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), 
    contactController.deleteContact
);

module.exports = router;

// routes/contentRoutes.js
const express = require("express");
const router = express.Router();

const contentController = require("../../../src/controllers/admin/api_v1_admin_content_controllers");
const { createUploader } = require("../../utils/UploadFile");

// Helpers/Utils untuk mengupload file gambar konten
// Menyimpan file ke './src/images/contents/' dengan nama field 'gambar'
const uploadGambar = createUploader("./src/images/contents/", "gambar");

const { expressjwt } = require("express-jwt");

/**
 * Mendefinisikan rute untuk resource 'contents'.
 * Base URL: /contents
 */

// GET / -> Mendapatkan semua konten
router.get("/", contentController.getAllContents);

// GET /:id -> Mendapatkan konten berdasarkan ID
router.get("/:id", contentController.getContentById);

// POST / -> Membuat konten baru (dengan upload gambar)
router.post(
    "/", 
    expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), 
    uploadGambar, 
    contentController.createContent
);

// PUT /:id -> Memperbarui konten berdasarkan ID (dengan upload gambar)
router.put(
    "/:id", 
    expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), 
    uploadGambar, 
    contentController.updateContent
);

// DELETE /:id -> Menghapus konten berdasarkan ID (soft delete)
router.delete(
    "/:id", 
    expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), 
    contentController.deleteContent
);

module.exports = router;

// routes/contactRoutes.js
const express = require("express");
const router = express.Router();

const contentController = require("../../controllers/web/api_v1_web_content_controllers");

/**
 * Mendefinisikan rute untuk resource 'contacts'.
 * Base URL: /contacts
 */

// GET / -> Mengambil konten
router.get("/", contentController.getAllContents);

// GET /:id -> Mengambil konten berdasarkan ID
router.get("/:id", contentController.getContentById);

module.exports = router;

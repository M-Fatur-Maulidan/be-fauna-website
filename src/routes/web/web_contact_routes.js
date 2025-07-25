// routes/contactRoutes.js
const express = require("express");
const router = express.Router();

const contactController = require("../../controllers/web/api_v1_web_contact_controllers");

/**
 * Mendefinisikan rute untuk resource 'contacts'.
 * Base URL: /contacts
 */

// POST / -> Membuat kontak baru
router.post("/", contactController.createContact);

module.exports = router;

// routes/contactRoutes.js
const express = require("express");
const router = express.Router();

const invoiceController = require("../../controllers/web/api_v1_web_invoice_controllers");

/**
 * Mendefinisikan rute untuk resource 'invoices'.
 * Base URL: /invoices
 */

// POST / -> Membuat invoice baru
router.post("/", invoiceController.createInvoice);

router.post("/payment/notify", invoiceController.paymentNotify);

module.exports = router;

// routes/contactRoutes.js
const express = require("express");
const router = express.Router();

const invoiceController = require("../../controllers/web/api_v1_web_invoice_controllers");

const { expressjwt } = require("express-jwt");

/**
 * Mendefinisikan rute untuk resource 'invoices'.
 * Base URL: /invoices
 */

// POST / -> Membuat invoice baru
router.post("/", expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }), invoiceController.createInvoice);

router.post("/payment/notify", invoiceController.paymentNotify);

router.post('/payment/method-list', invoiceController.paymentMethodList);

module.exports = router;

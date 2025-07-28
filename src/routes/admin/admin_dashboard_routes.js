// routes/contentRoutes.js
const express = require("express");
const router = express.Router();

const dashboardController = require("../../../src/controllers/admin/api_v1_admin_dashboard_controllers");

const { expressjwt } = require("express-jwt");

/**
 * Mendefinisikan rute untuk resource 'contents'.
 * Base URL: /contents
 */

// GET / -> Mendapatkan semua kontak
router.get(
    "/", 
    expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }),  
    dashboardController.getDashboard
);

module.exports = router;

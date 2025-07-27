// index.js
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

// Import routes
// Auth Routes
const authRoutes = require("./src/routes/auth_routes");

// User Routes
// Admin
const userRoutes = require("./src/routes/admin/users/admin_user_routes");
const roleRoutes = require("./src/routes/admin/users/admin_role_routes");
const userRoleRoutes = require("./src/routes/admin/users/admin_user_role_routes");
// Web
const webUserRoutes = require("./src/routes/web/users/web_user_routes");

// Content Routes
const contentRoutes = require("./src/routes/admin/admin_content_routes");

// Contact Routes
// Web
const contactRoutes = require("./src/routes/web/web_contact_routes");

// Invoice Routes
// Web
const invoiceRoutes = require("./src/routes/web/web_invoice_routes");

// --> End Import Routes

const apiv1Admin = "/api/v1/admin";
const apiv1Web = "/api/v1/web";
const apiv1 = "/api/v1";

// Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// Route untuk Autentikasi
app.use(apiv1 + "/auth", authRoutes);

// Route untuk Users
app.use(apiv1Admin + "/users", userRoutes);
app.use(apiv1Admin + "/users", roleRoutes);
app.use(apiv1Admin + "/users", userRoleRoutes);

// Route untuk Contents
app.use(apiv1Admin + "/contents", contentRoutes);

// Route untuk Web Users
app.use(apiv1Web + "/users", webUserRoutes);

// Route untuk Contacts
app.use(apiv1Web + "/contacts", contactRoutes);

// Route untuk Invoices
app.use(apiv1Web + "/invoices", invoiceRoutes);

// Static files for user images
require("./src/static/index_images.js")(app);

// Rute dasar untuk mengecek apakah server berjalan
app.get("/", (req, res) => {
  res.send("Welcome to the User Service API!");
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

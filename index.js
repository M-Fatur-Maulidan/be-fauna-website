// index.js
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

// Import routes
// User Routes
const userRoutes = require("./src/routes/admin/users/admin_user_routes");

// Content Routes
const contentRoutes = require("./src/routes/admin/admin_content_routes");

// --> End Import Routes

const apiv1 = "/api/v1";

// Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// Route untuk Users
app.use(apiv1 + "/users", userRoutes);

// Route untuk Contents
app.use(apiv1 + "/contents", contentRoutes);

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

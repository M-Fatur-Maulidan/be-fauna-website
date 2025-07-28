// routes/userRoutes.js
const express = require("express");
const router = express.Router();

const userController = require("../../../controllers/web/users/api_v1_web_user_controllers");

const { expressjwt } = require("express-jwt");

/**
 * Mendefinisikan rute untuk resource 'users'.
 * Base URL: /users
 */

// GET /users/:id -> Mendapatkan pengguna berdasarkan ID
router.get(
  "/",
  expressjwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }),
  userController.getUserById
);

module.exports = router;

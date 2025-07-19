// services/auth/authService.js
const knex = require("../config/database_knex");

const userRoleService = require("./admin/users/admin_user_role_services");
const RefreshToken = require("../models/refresh_tokens");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Business Logic untuk Autentikasi.
 */
const authService = {
  /**
   * Memproses login pengguna.
   * @param {string} email - Email pengguna.
   * @param {string} password - Password pengguna.
   * @returns {Promise<string>} - Mengembalikan JWT jika berhasil.
   */
  login: async (email, password) => {
    try {
      const user = await knex("users")
        .where({ email: email, data_status: 1 })
        .first();

      if (!user) {
        throw new Error("Kredensial tidak valid");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Kredensial tidak valid");
      }

      const roles = await userRoleService.getRolesByUserId(user.id);

      const payload = {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role_name: roles[0].nama,
      };

      const accessTokenPayload = {
        id: user.id,
        nama: user.nama,
        roles: roleNames,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN || "15m",
      });

      const refreshTokenPayload = { id: user.id }; // Payload bisa lebih minimal
      const refreshTokenString = jwt.sign(
        refreshTokenPayload,
        process.env.JWT_REFRESH_SECRET_KEY,
        {
          expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
        }
      );

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // Samakan dengan masa berlaku token

      await RefreshToken.create({
        token: refreshTokenString, // Simpan JWT-nya, bukan UUID
        user_id: user.id,
        expires_at: expiresAt,
      });

      return {
        accessToken: token,
        refreshToken: refreshTokenString,
        user: accessTokenPayload,
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Membuat Access Token baru menggunakan JWT Refresh Token.
   */
  refreshToken: async (token) => {
    // 1. Cek apakah token masih ada di database (belum di-logout)
    const storedToken = await RefreshToken.findOne({ where: { token: token } });
    if (!storedToken) {
      throw new Error("Sesi tidak valid. Silakan login kembali.");
    }

    // 2. Verifikasi JWT Refresh Token menggunakan kunci rahasia yang berbeda
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);

      const user = await knex("users").where({ id: decoded.id }).first();
      if (!user) {
        throw new Error("User tidak ditemukan.");
      }

      // 3. Buat Access Token baru
      const roles = await userRoleService.getRolesByUserId(user.id);
      const accessTokenPayload = {
        id: user.id,
        nama: user.nama,
        role: roles[0].nama,
      };

      const newAccessToken = jwt.sign(
        accessTokenPayload,
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
        }
      );

      return { accessToken: newAccessToken };
    } catch (err) {
      await RefreshToken.destroy({ where: { token: token } });
      throw new Error("Refresh token tidak valid atau sudah kedaluwarsa.");
    }
  },

  /**
   * Menghapus Refresh Token dari database (proses logout).
   */
  logout: async (token) => {
    const result = await RefreshToken.destroy({ where: { token: token } });
    if (result === 0) {
      console.log("Logout attempt for a token that does not exist.");
    }
    return { message: "Logout berhasil." };
  },
};

module.exports = authService;

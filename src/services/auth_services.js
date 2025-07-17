// services/auth/authService.js
const knex = require("../config/database_knex");

const userRoleService = require("./admin/users/admin_user_role_services");

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

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN || "15m",
      });

      return { token, user: payload };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = authService;

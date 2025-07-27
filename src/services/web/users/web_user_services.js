// services/userService.js

const { sequelize } = require("../../../config/database_sequlize");
const knex = require("../../../config/database_knex");

const User = require("../../../models/users/users");

const bcrypt = require("bcryptjs");

/**
 * Business Logic untuk mengelola data pengguna.
 * - Knex digunakan untuk SELECT (Read).
 * - Sequelize digunakan untuk INSERT, UPDATE, DELETE (Write).
 */
const userService = {
  getUserById: async (id) => {
    const user = await knex("users")
      .select("id", "nama", "email", "telepon")
      .where({ id: id, data_status: 1 })
      .first();

    return user || null;
  },
};

module.exports = userService;

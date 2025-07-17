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
  getUsers: async (page, itemPerPage) => {
    const users = knex("users")
      .select("id", "nama", "email", "telepon", "alamat", "foto", "created_at")
      .where("data_status", 1)
      .limit(itemPerPage)
      .offset((page - 1) * itemPerPage);

    return users;
  },

  getTotalUsers: async () => {
    const users = await knex("users")
      .count({ count: "id" })
      .where("data_status", 1)
      .first();

    return users.count;
  },

  getUserById: async (id) => {
    const user = await knex("users")
      .select("id", "nama", "email", "telepon", "alamat", "foto", "created_at")
      .where({ id: id, data_status: 1 })
      .first();

    return user || null;
  },

  createUser: async (userData) => {
    try {
      userData.password = await bcrypt.hash(userData.password, 10);

      const user = await User.create(userData);

      return user;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  },

  updateUser: async (id, userData) => {
    const transaction = await sequelize.transaction();
    try {
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }

      const user = await User.findByPk(id);

      if (!user) {
        throw new Error("User not found");
      }

      user.nama = userData.nama;
      user.email = userData.email;
      user.telepon = userData.telepon;
      user.alamat = userData.alamat;
      user.password = userData.password;
      if (userData.foto) {
        user.foto = userData.foto;
      }
      user.updated_at = new Date();
      user.data_status = userData.data_status;

      await user.save({ transaction });

      transaction.commit();

      return user;
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error updating user: " + error.message);
    }
  },

  deleteUser: async (id) => {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error("User not found");
      }

      user.data_status = 0; // Soft delete
      user.updated_at = new Date();

      await user.save();

      return user;
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  },
};

module.exports = userService;

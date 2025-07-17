// services/roles/roleService.js
const { sequelize } = require("../../../config/database_sequlize"); // Sesuaikan path
const knex = require("../../../config/database_knex"); // Sesuaikan path
const Role = require("../../../models/users/roles"); // Sesuaikan path

/**
 * Business Logic untuk mengelola data roles.
 */
const roleService = {
  /**
   * Mengambil semua roles yang aktif.
   */
  getAllRoles: async () => {
    const roles = await knex("roles")
      .select("id", "nama", "created_at")
      .where("data_status", 1);
    return roles;
  },

  /**
   * Mengambil satu role berdasarkan ID.
   */
  getRoleById: async (id) => {
    const role = await knex("roles")
      .select("id", "nama", "created_at")
      .where({ id: id, data_status: 1 })
      .first();
    return role || null;
  },

  /**
   * Membuat role baru.
   */
  createRole: async (roleData) => {
    try {
      const newRole = await Role.create(roleData);
      return newRole;
    } catch (error) {
      // Mengambil pesan validasi dari Sequelize
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const messages = error.errors.map((e) => e.message);
        throw new Error(messages.join(", "));
      }
      throw new Error("Error creating role: " + error.message);
    }
  },

  /**
   * Memperbarui role yang ada.
   */
  updateRole: async (id, roleData) => {
    const transaction = await sequelize.transaction();
    try {
      const role = await Role.findByPk(id);
      if (!role || role.data_status === 0) {
        throw new Error("Role not found");
      }

      await role.update(roleData, { transaction });

      await transaction.commit();
      return role;
    } catch (error) {
      await transaction.rollback();
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const messages = error.errors.map((e) => e.message);
        throw new Error(messages.join(", "));
      }
      throw new Error("Error updating role: " + error.message);
    }
  },

  /**
   * Menghapus role (Soft Delete).
   */
  deleteRole: async (id) => {
    try {
      const role = await Role.findByPk(id);
      if (!role || role.data_status === 0) {
        throw new Error("Role not found");
      }

      role.data_status = 0;
      await role.save();

      return role;
    } catch (error) {
      throw new Error("Error deleting role: " + error.message);
    }
  },
};

module.exports = roleService;

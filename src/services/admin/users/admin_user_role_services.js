// services/user_roles/userRoleService.js
const User = require("../../../models/users/users");
const Role = require("../../../models/users/roles");
const UserRole = require("../../../models/users/user_roles");
const knex = require("../../../config/database_knex");

/**
 * Business Logic untuk mengelola hubungan User dan Role.
 */
const userRoleService = {
  /**
   * Menetapkan role ke seorang pengguna.
   */
  assignRolesToUser: async (userId, roleId) => {
    try {
      let userRole = {};

      userRole = await UserRole.findOne({
        where: { user_id: userId, role_id: roleId },
      });

      if (userRole) {
        throw new Error("Role already assigned to user.");
      } else {
        userRole = await UserRole.create({
          user_id: userId,
          role_id: roleId,
        });
      }

      return { message: "Roles assigned successfully." };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * Menghapus role dari seorang pengguna.
   */
  removeRoleFromUser: async (userId, roleId) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const role = await Role.findByPk(roleId);
      if (!role) {
        throw new Error("Role not found");
      }

      // Menggunakan metode asosiasi dari Sequelize
      const result = await user.removeRole(role);

      if (result === 0) {
        throw new Error("User did not have this role.");
      }

      return { message: "Role removed successfully." };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * Mendapatkan semua peran dari seorang pengguna.
   */
  getRolesByUserId: async (userId) => {
    const roles = await knex("user_roles")
      .join("roles", "user_roles.role_id", "=", "roles.id")
      .where("user_roles.user_id", userId)
      .andWhere("roles.data_status", 1)
      .select("roles.id", "roles.nama");

    return roles;
  },

  /**
   * Mendapatkan semua pengguna yang memiliki peran tertentu.
   */
  getUsersByRoleId: async (roleId) => {
    const users = await knex("user_roles")
      .join("users", "user_roles.user_id", "=", "users.id")
      .where("user_roles.role_id", roleId)
      .andWhere("users.data_status", 1)
      .select("users.id", "users.nama", "users.email");

    return users;
  },
};

module.exports = userRoleService;

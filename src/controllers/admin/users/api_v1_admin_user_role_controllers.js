// controllers/user_roles/userRoleController.js
const userRoleService = require("../../../services/admin/users/admin_user_role_services");

const userRoleController = {
  /**
   * Handler untuk menetapkan peran ke pengguna.
   * Menerima array of role_ids dalam body.
   */
  assignRoles: async (req, res) => {
    try {
      const { userId } = req.params;
      const { role_ids } = req.body; // Expecting an array of role IDs, e.g., [1, 2]

      if (!role_ids || !Array.isArray(role_ids) || role_ids.length === 0) {
        return res.status(400).json({
          status: "fail",
          message: "role_ids must be a non-empty array.",
        });
      }

      const result = await userRoleService.assignRolesToUser(userId, role_ids);
      res.status(200).json({
        status: "success",
        message: result.message,
      });
    } catch (error) {
      const statusCode = error.message.includes("not found") ? 404 : 500;
      res.status(statusCode).json({
        status: "error",
        message: error.message,
      });
    }
  },

  /**
   * Handler untuk mencabut peran dari pengguna.
   */
  removeRole: async (req, res) => {
    try {
      const { userId, roleId } = req.params;
      const result = await userRoleService.removeRoleFromUser(userId, roleId);
      res.status(200).json({
        status: "success",
        message: result.message,
      });
    } catch (error) {
      const statusCode =
        error.message.includes("not found") ||
        error.message.includes("did not have")
          ? 404
          : 500;
      res.status(statusCode).json({
        status: "error",
        message: error.message,
      });
    }
  },

  /**
   * Handler untuk mendapatkan semua peran dari seorang pengguna.
   */
  getUserRoles: async (req, res) => {
    try {
      const { userId } = req.params;
      const roles = await userRoleService.getRolesByUserId(userId);
      res.status(200).json({
        status: "success",
        message: `Successfully fetched roles for user ${userId}`,
        data: roles,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

module.exports = userRoleController;

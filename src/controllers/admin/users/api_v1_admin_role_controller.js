// controllers/roles/roleController.js
const roleService = require("../../../services/admin/users/admin_role_services");

/**
 * Controller untuk menangani request terkait roles.
 */
const roleController = {
  /**
   * Handler untuk mendapatkan semua roles.
   */
  getAllRoles: async (req, res) => {
    try {
      const roles = await roleService.getAllRoles();
      res.status(200).json({
        status: "success",
        message: "Successfully fetched all roles",
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

  /**
   * Handler untuk mendapatkan role berdasarkan ID.
   */
  getRoleById: async (req, res) => {
    try {
      const { id } = req.params;
      const role = await roleService.getRoleById(id);

      if (!role) {
        return res.status(404).json({
          status: "error",
          message: `Role with id ${id} not found`,
        });
      }

      res.status(200).json({
        status: "success",
        message: `Successfully fetched role with id ${id}`,
        data: role,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  /**
   * Handler untuk membuat role baru.
   */
  createRole: async (req, res) => {
    try {
      const { nama } = req.body;

      if (!nama) {
        return res.status(400).json({
          status: "fail",
          message: "Nama role is required",
        });
      }

      const newRole = await roleService.createRole({ nama });

      res.status(201).json({
        status: "success",
        message: "Role created successfully",
        data: newRole,
      });
    } catch (error) {
      // Error validasi atau unique constraint dari service
      if (
        error.message.includes("sudah ada") ||
        error.message.includes("tidak boleh kosong")
      ) {
        return res.status(409).json({
          status: "fail",
          message: error.message,
        });
      }
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  /**
   * Handler untuk memperbarui role.
   */
  updateRole: async (req, res) => {
    try {
      const { id } = req.params;
      const { nama } = req.body;

      if (!nama) {
        return res.status(400).json({
          status: "fail",
          message: "Nama role is required",
        });
      }

      const updatedRole = await roleService.updateRole(id, { nama });

      res.status(200).json({
        status: "success",
        message: `Role with id ${id} updated successfully`,
        data: updatedRole,
      });
    } catch (error) {
      if (error.message === "Role not found") {
        return res
          .status(404)
          .json({ status: "error", message: error.message });
      }
      if (error.message.includes("sudah ada")) {
        return res.status(409).json({ status: "fail", message: error.message });
      }
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  /**
   * Handler untuk menghapus role (soft delete).
   */
  deleteRole: async (req, res) => {
    try {
      const { id } = req.params;
      await roleService.deleteRole(id);

      res.status(200).json({
        status: "success",
        message: `Role with id ${id} deleted successfully`,
      });
    } catch (error) {
      if (error.message === "Role not found") {
        return res
          .status(404)
          .json({ status: "error", message: error.message });
      }
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

module.exports = roleController;

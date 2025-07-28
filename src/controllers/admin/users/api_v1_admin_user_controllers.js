// controllers/userController.js
const userService = require("../../../services/admin/users/admin_user_services");

/**
 * Controller untuk menangani request terkait pengguna.
 */
const userController = {
  /**
   * Handler untuk mendapatkan semua pengguna.
   */
  getAllUsers: async (req, res) => {
    try {
      let index = 1;

      const page = parseInt(req.query.page) || 1;
      const itemPerPage = parseInt(req.query.item_per_page) || 10;

      const users = await userService.getUsers(page, itemPerPage);

      const totalUsers = await userService.getTotalUsers();

      users.forEach((user) => {
        user.foto_url_original = user.foto;
        user.foto = process.env.APP_URL + "/image-users-foto/" + user.foto;

        user.no = itemPerPage * (page - 1) + index++;
      });

      res.status(200).json({
        status: "success",
        message: "Successfully fetched all users",
        data: users,
        total_data: totalUsers,
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
   * Handler untuk mendapatkan pengguna berdasarkan ID.
   */
  getUserById: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await userService.getUserById(id);

      if (!user) {
        res.status(404).json({
          status: "error",
          message: `User with id ${id} not found`,
        });
      }

      res.status(200).json({
        status: "success",
        message: `Successfully fetched user with id ${id}`,
        data: user,
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
   * Handler untuk membuat pengguna baru.
   */
  createUser: async (req, res) => {
    try {
      if (req.file) req.body.foto = req.file.filename;

      const userData = req.body;

      // Validasi input sederhana
      if (!userData.nama || !userData.email || !userData.password) {
        return res.status(400).json({
          status: "fail",
          message: "Name, email, and password are required",
        });
      }

      const newUser = await userService.createUser(userData);

      res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: newUser,
      });
    } catch (error) {
      // Tangani error jika email sudah ada (UNIQUE KEY constraint)
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          status: "fail",
          message: "Email already exists",
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
   * Handler untuk memperbarui pengguna.
   */
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;

      const result = await userService.updateUser(id, userData);

      res.status(200).json({
        status: "success",
        message: `User updated successfully`,
        data: {
          id: id,
          nama: result.nama,
          email: result.email,
          telepon: result.telepon,
          alamat: result.alamat,
          foto: result.foto,
        },
      });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          status: "fail",
          message: "Email already exists for another user",
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
   * Handler untuk menghapus pengguna (soft delete).
   */
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await userService.deleteUser(id);

      return res.status(200).json({
        status: "success",
        message: "User deleted successfully",
        data: result,
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

module.exports = userController;

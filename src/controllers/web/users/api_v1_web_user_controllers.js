// controllers/userController.js
const userService = require("../../../services/web/users/web_user_services");

/**
 * Controller untuk menangani request terkait pengguna.
 */
const userController = {
  /**
   * Handler untuk mendapatkan pengguna berdasarkan ID.
   */
  getUserById: async (req, res) => {
    try {
      console.log("Fetching user with ID:", req.params.id);
      const { id } = req.params;
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
};

module.exports = userController;

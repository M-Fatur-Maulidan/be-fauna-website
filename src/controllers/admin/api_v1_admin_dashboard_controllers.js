// controllers/dashboardController.js
const dashboardService = require("../../services/admin/admin_dashboard_services"); // Sesuaikan path

/**
 * Controller untuk menangani request terkait dashboard.
 */
const dashboardController = {
  /**
   * Handler untuk mendapatkan semua konten.
   */
  getDashboard: async (req, res) => {
    try {

        const user = await dashboardService.getTotalUsers();
        const content = await dashboardService.getTotalContents();
        const contact = await dashboardService.getTotalFeedback();

      res.status(200).json({
        status: "success",
        message: "Successfully fetched all contents",
        data: {
            user,
            content,
            contact
        },
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

module.exports = dashboardController;

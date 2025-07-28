// controllers/contents/contentController.js
const contentService = require("../../services/web/web_content_services"); // Sesuaikan path

/**
 * Controller untuk menangani request terkait konten.
 */
const contentController = {
  /**
   * Handler untuk mendapatkan semua konten.
   */
  getAllContents: async (req, res) => {
    try {
      let index = 1;

      const page = parseInt(req.query.page) || 1;
      const itemPerPage = parseInt(req.query.item_per_page) || 8;

      const contents = await contentService.getAllContents(page, itemPerPage);
      const totalContents = await contentService.getTotalContents();

      // Menambahkan URL lengkap untuk gambar
      contents.forEach((content) => {
        content.no = itemPerPage * (page - 1) + index++;
        if (content.gambar) {
          content.gambar_url =
            process.env.APP_URL + "/image-contents/" + content.gambar;
        } else {
          content.gambar_url = null;
        }
      });

      res.status(200).json({
        status: "success",
        message: "Successfully fetched all contents",
        data: contents,
        total_data: totalContents,
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
   * Handler untuk mendapatkan konten berdasarkan ID.
   */
  getContentById: async (req, res) => {
    try {
      const { id } = req.params;
      const content = await contentService.getContentById(id);

      if (!content) {
        return res.status(404).json({
          status: "error",
          message: `Content with id ${id} not found`,
        });
      }

      if (content.gambar) {
        content.gambar_url =
          process.env.APP_URL + "/image-contents/" + content.gambar;
      } else {
        content.gambar_url = null;
      }

      res.status(200).json({
        status: "success",
        message: `Successfully fetched content with id ${id}`,
        data: content,
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

module.exports = contentController;

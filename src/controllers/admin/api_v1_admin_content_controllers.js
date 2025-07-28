// controllers/contents/contentController.js
const contentService = require("../../services/admin/admin_content_services"); // Sesuaikan path

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
      let userId = req.auth.id;

      if (userId == 1) {
        userId = null;
      }

      const page = parseInt(req.query.page) || 1;
      const itemPerPage = parseInt(req.query.item_per_page) || 10;

      const contents = await contentService.getAllContents(page, itemPerPage, userId);
      const totalContents = await contentService.getTotalContents(userId);

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

  /**
   * Handler untuk membuat konten baru.
   */
  createContent: async (req, res) => {
    try {
      const contentData = req.body;

      contentData.created_by = req.auth.id;

      // Menambahkan nama file gambar dari middleware upload
      if (req.file) {
        contentData.gambar = req.file.filename;
      }

      const newContent = await contentService.createContent(contentData);

      res.status(201).json({
        status: "success",
        message: "Content created successfully",
        data: newContent,
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
   * Handler untuk memperbarui konten.
   */
  updateContent: async (req, res) => {
    try {
      const { id } = req.params;
      const contentData = req.body;

      contentData.updated_by = req.auth.id;

      if (req.file) contentData.gambar = req.file.filename;

      const updatedContent = await contentService.updateContent(
        id,
        contentData
      );

      res.status(200).json({
        status: "success",
        message: `Content with id ${id} updated successfully`,
        data: updatedContent,
      });
    } catch (error) {
      if (error.message == "Content not found") {
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

  /**
   * Handler untuk menghapus konten (soft delete).
   */
  deleteContent: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.auth.id;
      
      await contentService.deleteContent(id, userId);

      res.status(200).json({
        status: "success",
        message: `Content with id ${id} deleted successfully`,
      });
    } catch (error) {
      if (error.message === "Content not found") {
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

module.exports = contentController;

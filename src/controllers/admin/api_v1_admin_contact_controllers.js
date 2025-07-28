// controllers/contents/contentController.js
const { getAllContacts } = require("../../services/admin/admin_contact_services");
const contactService = require("../../services/admin/admin_contact_services"); // Sesuaikan path

/**
 * Controller untuk menangani request terkait konten.
 */
const contentController = {
  /**
   * Handler untuk mendapatkan semua konten.
   */
  getAllContacts: async (req, res) => {
    try {
      let index = 1;

      const page = parseInt(req.query.page) || 1;
      const itemPerPage = parseInt(req.query.item_per_page) || 10;

      const contacts = await getAllContacts();

      contacts.forEach((contact) => {
        contact.no = itemPerPage * (page - 1) + index++;
      });

      res.status(200).json({
        status: "success",
        message: "Successfully fetched all contents",
        data: contacts,
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
//   getContentById: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const content = await contactService.getContentById(id);

//       if (!content) {
//         return res.status(404).json({
//           status: "error",
//           message: `Content with id ${id} not found`,
//         });
//       }

//       if (content.gambar) {
//         content.gambar_url =
//           process.env.APP_URL + "/image-contents/" + content.gambar;
//       } else {
//         content.gambar_url = null;
//       }

//       res.status(200).json({
//         status: "success",
//         message: `Successfully fetched content with id ${id}`,
//         data: content,
//       });
//     } catch (error) {
//       res.status(500).json({
//         status: "error",
//         message: "Internal server error",
//         error: error.message,
//       });
//     }
//   },

  /**
   * Handler untuk menghapus konten (soft delete).
   */
  deleteContact: async (req, res) => {
    try {
      const { id } = req.params;

      await contactService.deleteContact(id);

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

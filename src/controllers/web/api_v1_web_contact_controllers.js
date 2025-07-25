// controllers/contents/contactController.js
const contactServices = require("../../services/web/web_contact_services"); // Sesuaikan path

/**
 * Controller untuk menangani request terkait kontak.
 */
const contactController = {
  /**
   * Handler untuk membuat kontak baru.
   */
  createContact: async (req, res) => {
    try {
      const contactData = req.body

      const newContact = await contactServices.createContact(contactData);

      res.status(201).json({
        status: "success",
        message: "Contact created successfully",
        data: newContact,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  },
}

module.exports = contactController;

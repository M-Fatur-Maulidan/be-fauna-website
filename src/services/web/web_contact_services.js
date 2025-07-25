// services/contents/contactServices.js
const { sequelize } = require("../../config/database_sequlize");
const knex = require("../../config/database_knex");
const Contact = require("../../models/contacts");

/**
 * Business Logic untuk mengelola data kontak.
 * - Knex digunakan untuk SELECT (Read).
 * - Sequelize digunakan untuk INSERT.
 */
const contactServices = {

  /**
   * Membuat kontak baru.
   */
  createContact: async (contactData) => {
    try {
      const newContact = await Contact.create(contactData);

      return newContact;
    } catch (error) {
      throw new Error("Error creating contact: " + error.message);
    }
  },
};

module.exports = contactServices;

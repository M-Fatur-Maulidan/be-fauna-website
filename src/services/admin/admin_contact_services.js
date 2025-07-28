// services/contents/contentService.js
const { sequelize } = require("../../config/database_sequlize");
const knex = require("../../config/database_knex");
const Contact = require("../../models/contacts");

/**
 * Business Logic untuk mengelola data feedback.
 * - Knex digunakan untuk SELECT (Read).
 * - Sequelize digunakan untuk INSERT, UPDATE, DELETE (Write).
 */
const contactServices = {
  /**
   * Mengambil daftar konten dengan paginasi.
   */
  getAllContacts: async (page, itemPerPage) => {
    const contacts = await knex("contacts")
      .select(
        "id",
        "nama",
        "email",
        "message",
        "created_at"
      )
      .limit(itemPerPage)
      .offset((page - 1) * itemPerPage);
    return contacts;
  },

  /**
   * Menghitung total konten yang aktif.
   */
  getTotalContacts: async () => {
    const result = await knex("contacts")
      .count({ count: "id" })
      .first();

    return result.count;
  },

  /**
   * Mengambil satu konten berdasarkan ID.
   */
  getContactById: async (id) => {
    const content = await knex("contents")
      .select(
        "id",
        "nama_umum",
        "nama_ilmiah",
        "deskripsi",
        "habitat",
        "makanan",
        "rentang_hidup",
        "gambar",
        "status_konservasi",
        "jenis_fauna_id",
        "created_at",
        "updated_at"
      )
      .where({ id: id, data_status: 1 })
      .first();

    return content || null;
  },

  /**
   * Menghapus konten.
   */
  deleteContact: async (id) => {
    try {
      const contact = await Contact.findByPk(id);

      if (!contact) {
        throw new Error("Contact not found");
      }

      await contact.destroy();

      return contact;
    } catch (error) {
      throw new Error("Error deleting content: " + error.message);
    }
  },
};

module.exports = contactServices;

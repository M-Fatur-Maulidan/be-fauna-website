// services/dashboardService.js
const knex = require("../../config/database_knex");

/**
 * Business Logic untuk mengelola data feedback.
 * - Knex digunakan untuk SELECT (Read).
 * - Sequelize digunakan untuk INSERT, UPDATE, DELETE (Write).
 */
const contactServices = {
  /**
   * Mengambil daftar konten dengan paginasi.
   */
  getTotalUsers: async () => {
    const users = await knex("users")
        .count({ count: "id" })
        .where('data_status', 1)
        .first();

    return users.count;
  },

  getTotalContents: async () => {
    const contents = await knex("contents")
      .count({ count: "id" })
      .where('data_status', 1)
      .first();

    return contents.count;
  },

  getTotalFeedback: async () => {
    const contacts = await knex("contacts")
      .count({ count: "id" })
      .first();

    return contacts.count;
  }
};

module.exports = contactServices;

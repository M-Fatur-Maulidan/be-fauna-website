// services/contents/contentService.js
const { sequelize } = require("../../config/database_sequlize");
const knex = require("../../config/database_knex");
const Content = require("../../models/contents");

/**
 * Business Logic untuk mengelola data konten fauna.
 * - Knex digunakan untuk SELECT (Read).
 * - Sequelize digunakan untuk INSERT, UPDATE, DELETE (Write).
 */
const contentService = {
  /**
   * Mengambil daftar konten dengan paginasi.
   */
  getAllContents: async (page, itemPerPage) => {
    const contents = await knex("contents")
      .select(
        "id",
        "nama",
        "deskripsi",
        "gambar",
        "jenis_fauna",
        "is_verified",
        "created_at"
      )
      .where("data_status", 1)
      .limit(itemPerPage)
      .offset((page - 1) * itemPerPage);
    return contents;
  },

  /**
   * Menghitung total konten yang aktif.
   */
  getTotalContents: async () => {
    const result = await knex("contents")
      .count({ count: "id" })
      .where("data_status", 1)
      .first();
    return result.count;
  },

  /**
   * Mengambil satu konten berdasarkan ID.
   */
  getContentById: async (id) => {
    const content = await knex("contents")
      .select(
        "id",
        "nama",
        "deskripsi",
        "gambar",
        "jenis_fauna",
        "is_verified",
        "created_at",
        "updated_at"
      )
      .where({ id: id, data_status: 1 })
      .first();

    return content || null;
  },

  /**
   * Membuat konten baru.
   */
  createContent: async (contentData) => {
    try {
      const newContent = await Content.create(contentData);

      return newContent;
    } catch (error) {
      throw new Error("Error creating content: " + error.message);
    }
  },

  /**
   * Memperbarui konten yang ada.
   */
  updateContent: async (id, contentData) => {
    const transaction = await sequelize.transaction();
    try {
      const content = await Content.findByPk(id);

      if (!content) throw new Error("Content not found");

      content.nama_umum = contentData.nama_umum;
      content.nama_ilmiah = contentData.nama_ilmiah;
      content.deskripsi = contentData.deskripsi;
      if (contentData.gambar) content.gambar = contentData.gambar;
      content.habitat = contentData.habitat;
      content.makanan = contentData.makanan;
      content.rentang_hidup = contentData.rentang_hidup;
      content.jenis_fauna_id = contentData.jenis_fauna_id;
      content.is_verified = 0;
      content.updated_by = contentData.updated_by;

      // Update data
      await content.update(contentData, { transaction });

      await transaction.commit();

      return content;
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error updating content: " + error.message);
    }
  },

  /**
   * Menghapus konten (Soft Delete).
   */
  deleteContent: async (id, userId) => {
    try {
      const content = await Content.findByPk(id);

      if (!content) {
        throw new Error("Content not found");
      }

      // Soft delete dengan mengubah data_status
      content.data_status = 0;
      content.updated_by = userId;
      content.updated_at = new Date();

      await content.save();

      return content;
    } catch (error) {
      throw new Error("Error deleting content: " + error.message);
    }
  },
};

module.exports = contentService;

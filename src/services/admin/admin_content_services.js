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
  getAllContents: async (page, itemPerPage, userId) => {
    const contents = knex("contents")
      .select(
        "id",
        "nama_umum",
        "nama_ilmiah",
        "created_at"
      )
      .where("data_status", 1)
      .limit(itemPerPage)
      .offset((page - 1) * itemPerPage);

    if (userId) {
      contents.where("created_by", userId);
    }

    return contents;
  },

  /**
   * Menghitung total konten yang aktif.
   */
  getTotalContents: async (userId) => {
    const result = knex("contents")
      .count({ count: "id" })
      .where("data_status", 1)
      .first();

    if (userId) {
      result.where("created_by", userId);
    }
    
    return result.count;
  },

  /**
   * Mengambil satu konten berdasarkan ID.
   */
  getContentById: async (id) => {
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
      content.status_konservasi = contentData.status_konservasi;
      content.is_verified = 0;
      content.updated_by = contentData.updated_by;
      content.updated_at = new Date();

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

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
        "contents.id",
        "nama_umum",
        "nama_ilmiah",
        "gambar",
        "created_by",
        "users.nama",
      )
      .where("contents.data_status", 1)
      .limit(itemPerPage)
      .offset((page - 1) * itemPerPage)
      .leftJoin("users", "contents.created_by", "users.id");

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
        "contents.id",
        "nama_umum",
        "nama_ilmiah",
        "deskripsi",
        "habitat",
        "makanan",
        "rentang_hidup",
        "gambar",
        "status_konservasi",
        "jenis_fauna_id",
        "jenis_faunas.nama AS jenis_fauna",
        "users.nama AS created_by",
      )
      .where("contents.id", id)
      .where("contents.data_status", 1)
      .leftJoin("users", "contents.created_by", "users.id")
      .leftJoin("jenis_faunas", "contents.jenis_fauna_id", "jenis_faunas.id")
      .first();

    return content || null;
  },
};

module.exports = contentService;

// controllers/auth/authController.js
const authService = require("../services/auth_services"); // Sesuaikan path

const authController = {
  /**
   * Handler untuk login pengguna.
   */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validasi input sederhana
      if (!email || !password) {
        return res.status(400).json({
          status: "fail",
          message: "Email dan password harus diisi.",
        });
      }

      const token = await authService.login(email, password);

      res.status(200).json({
        status: "success",
        message: "Login berhasil.",
        data: {
          token: token,
        },
      });
    } catch (error) {
      // Menangani error dari service
      if (error.message == "Kredensial tidak valid, silakan coba lagi.") {
        return res.status(401).json({
          status: "fail",
          message: error.message,
        });
      }

      // Error lainnya
      res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan pada server. ",
        error: error.message,
      });
    }
  },

  register: async (req, res) => {
    try {
      const { email, password, nama } = req.body;

      // Validasi input
      if (!email || !password || !nama) {
        return res.status(400).json({
          status: "fail",
          message: "Email, password, dan nama harus diisi.",
        });
      }

      const result = await authService.register({ email, password, nama });

      res.status(201).json({
        status: "success",
        message: result.message,
        data: {
          userId: result.id,
        },
      });
    } catch (error) {
      // Menangani error dari service
      if (error.message === "Email sudah terdaftar.") {
        return res.status(409).json({
          status: "fail",
          message: error.message,
        });
      }

      // Error lainnya
      res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan pada server.",
        error: error.message,
      });
    }
  },
};

module.exports = authController;

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
        message: "Terjadi kesalahan pada server. " + error.message,
        error: error.message,
      });
    }
  },

  register: async (req, res) => {
    try {
      const { email, password, nama, telepon } = req.body;

      // Validasi input
      if (!email || !password || !nama) {
        return res.status(400).json({
          status: "fail",
          message: "Email, password, dan nama harus diisi.",
        });
      }

      const result = await authService.register({
        email,
        password,
        nama,
        telepon,
      });

      res.status(201).json({
        status: "success",
        message: result.message,
        data: {
          userId: result.id,
        },
      });
    } catch (error) {
      // Menangani error dari service
      if (error.message == "Email sudah terdaftar.") {
        return res.status(409).json({
          status: "fail",
          message: error.message,
        });
      }

      // Error lainnya
      res.status(500).json({
        status: "error",
        message: error.message || "Terjadi kesalahan pada server.",
        error: error.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      const { token } = req.body;

      // Validasi input
      if (!token) {
        return res.status(400).json({
          status: "fail",
          message: "Token harus diisi.",
        });
      }

      await authService.logout(token);

      res.status(200).json({
        status: "success",
        message: "Logout berhasil.",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Terjadi kesalahan pada server.",
      });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const { token } = req.body;

      // Validasi input
      if (!token) {
        return res.status(400).json({
          status: "fail",
          message: "Refresh token harus diisi.",
        });
      }

      const newAccessToken = await authService.refreshToken(token);

      res.status(200).json({
        status: "success",
        message: "Token berhasil diperbarui.",
        data: {
          accessToken: newAccessToken.accessToken,
          refreshToken: newAccessToken.refreshToken,
          user: newAccessToken.user,
        },
      });
    } catch (error) {
      res.status(401).json({
        status: "fail",
        message: error.message || "Terjadi kesalahan pada server.",
      });
    }
  },
  tokenExpired: async (req, res) => {
    try {
      const {token} = req.body

      // Validasi input
      if (!token) {
        return res.status(400).json({
          status: "fail",
          message: "Token harus diisi.",
        });
      }

      const isExpired = await authService.isTokenExpired(token);

      res.status(200).json({
        status: "success",
        message: "Cek token berhasil.",
        data: {
          isExpired: isExpired,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Terjadi kesalahan pada server.",
      });
    }
  }
};

module.exports = authController;
